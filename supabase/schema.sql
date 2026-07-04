-- ============================================================
-- Esquema de la base de datos Langflow (Supabase / PostgreSQL)
-- Pega TODO este archivo en: Supabase Dashboard -> SQL Editor -> New query -> Run
-- ============================================================

-- ---------- Tipos ----------
-- Rol: 'staff' agrupa docentes/administrativos; 'student' estudiantes.
do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type user_role as enum ('staff', 'student');
  end if;
end$$;

-- ---------- Tabla: profiles ----------
-- Un perfil por cada usuario de Supabase Auth (auth.users).
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  email text not null,
  role user_role not null default 'student',
  created_at timestamptz not null default now()
);

-- ---------- Tabla: activities (actividades que crean los docentes) ----------
create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  language text not null,
  due_date date,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------- Tabla: grades (notas subidas por los docentes) ----------
create table if not exists public.grades (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.profiles (id) on delete cascade,
  student_name text not null,
  activity text not null,
  score text not null,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------- Tabla: student_progress (progreso de estudiantes) ----------
create table if not exists public.student_progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.profiles (id) on delete cascade,
  name text not null,
  language text not null,
  lessons_completed int not null default 0,
  total_lessons int not null default 0,
  quiz_accuracy int not null default 0,
  last_active text,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================
alter table public.profiles enable row level security;
alter table public.activities enable row level security;
alter table public.grades enable row level security;
alter table public.student_progress enable row level security;

-- Función auxiliar: ¿el usuario actual es staff?
create or replace function public.is_staff()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'staff'
  );
$$;

-- ---- profiles ----
-- Cada quien puede ver/editar su propio perfil; el staff puede ver todos.
drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
  for select using (auth.uid() = id or public.is_staff());

drop policy if exists "profiles_insert_self" on public.profiles;
create policy "profiles_insert_self" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self" on public.profiles
  for update using (auth.uid() = id);

-- ---- activities ----  (solo staff gestiona; todos los autenticados leen)
drop policy if exists "activities_select" on public.activities;
create policy "activities_select" on public.activities
  for select using (auth.role() = 'authenticated');

drop policy if exists "activities_write" on public.activities;
create policy "activities_write" on public.activities
  for all using (public.is_staff()) with check (public.is_staff());

-- ---- grades ----  (staff gestiona todo; el estudiante ve solo sus notas)
drop policy if exists "grades_select" on public.grades;
create policy "grades_select" on public.grades
  for select using (public.is_staff() or student_id = auth.uid());

drop policy if exists "grades_write" on public.grades;
create policy "grades_write" on public.grades
  for all using (public.is_staff()) with check (public.is_staff());

-- ---- student_progress ----  (staff ve todo; el estudiante ve solo el suyo)
drop policy if exists "progress_select" on public.student_progress;
create policy "progress_select" on public.student_progress
  for select using (public.is_staff() or student_id = auth.uid());

drop policy if exists "progress_write" on public.student_progress;
create policy "progress_write" on public.student_progress
  for all using (public.is_staff()) with check (public.is_staff());

-- ============================================================
-- Trigger: crear un profile automáticamente al registrarse un usuario
-- Toma name y role de los metadatos enviados al hacer signUp.
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', ''),
    new.email,
    coalesce((new.raw_user_meta_data ->> 'role')::user_role, 'student')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill: crea perfiles para usuarios de Auth que ya existían antes de este script.
-- (El trigger de arriba solo actúa sobre registros NUEVOS.)
insert into public.profiles (id, name, email, role)
select
  u.id,
  coalesce(u.raw_user_meta_data ->> 'name', ''),
  u.email,
  coalesce((u.raw_user_meta_data ->> 'role')::user_role, 'student')
from auth.users u
on conflict (id) do nothing;

-- ============================================================
-- Datos de ejemplo para el progreso (estudiantes de muestra sin cuenta).
-- student_id queda NULL porque no son usuarios reales de Auth.
-- ============================================================
insert into public.student_progress (student_id, name, language, lessons_completed, total_lessons, quiz_accuracy, last_active)
values
  (null, 'Ana Estudiante', 'Inglés', 2, 3, 85, 'Hoy'),
  (null, 'Carlos Pérez', 'Francés', 1, 2, 60, 'Ayer'),
  (null, 'María López', 'Portugués', 2, 2, 95, 'Hace 2 días'),
  (null, 'Juan Gómez', 'Italiano', 0, 2, 0, 'Hace 1 semana')
on conflict do nothing;

-- ---------- Tabla: stop_scores (juego Stop competitivo por idioma) ----------
create table if not exists public.stop_scores (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references public.profiles (id) on delete set null,
  student_name text not null,
  language_id text not null,
  letter char(1) not null,
  score int not null default 0,
  categories_filled int not null default 0,
  time_remaining int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists stop_scores_language_letter_idx
  on public.stop_scores (language_id, letter, score desc);

alter table public.stop_scores enable row level security;

drop policy if exists "stop_scores_select" on public.stop_scores;
create policy "stop_scores_select" on public.stop_scores
  for select using (auth.role() = 'authenticated');

drop policy if exists "stop_scores_insert" on public.stop_scores;
create policy "stop_scores_insert" on public.stop_scores
  for insert with check (auth.uid() = student_id);
