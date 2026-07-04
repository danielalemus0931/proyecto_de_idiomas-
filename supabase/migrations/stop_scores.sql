-- Ejecutar en Supabase SQL Editor (solo la tabla Stop)
-- Proyecto: qvyrrwqzrydksppddnbn

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
