# Langflow — App de idiomas

Aplicación web para aprender vocabulario en inglés, francés, portugués e italiano.

## Estructura del proyecto

```
proyecto_de_idiomas-/
├── src/          # Código de la aplicación web
├── public/       # Archivos públicos
├── front/        # Reservado para frontend adicional
└── back/         # Reservado para backend / API
```

## Cómo ver la app en tu computadora

```powershell
npm.cmd install
npm.cmd run dev
```

Abre el enlace que aparece (ej: `http://localhost:5173`).

## Cómo compartir la app (para que otros la usen en internet)

### Opción A — Netlify Drop (la más fácil)

1. Ejecuta: `npm.cmd run build`
2. Se crea una carpeta llamada `dist` dentro del proyecto
3. Entra a [https://app.netlify.com/drop](https://app.netlify.com/drop)
4. Arrastra la carpeta `dist` a la página
5. Netlify te dará un enlace público (ej: `https://algo-random.netlify.app`)
6. Comparte ese enlace por WhatsApp, email, etc.

### Opción B — GitHub (compartir el código)

Repositorio: `https://github.com/danielalemus0931/proyecto_de_idiomas-`

### Opción C — GitHub Pages (enlace público gratis)

1. Sube el código a GitHub
2. Ejecuta: `npm.cmd run build`
3. En GitHub, ve a tu repositorio → **Settings** → **Pages**
4. Sube o publica la carpeta `dist`
5. Tu app quedará en: `https://danielalemus0931.github.io/proyecto_de_idiomas-/`

## Comandos útiles

| Comando | Qué hace |
|---------|----------|
| `npm.cmd run dev` | Abre la app en tu PC |
| `npm.cmd run build` | Crea la versión para publicar (carpeta `dist`) |
