# beterahoy.es

Portal hiperlocal **Betera Hoy** para Bétera (Camp de Túria, Valencia). Misma arquitectura que lelianahoy.es / sabhoy.es: Next.js App Router + TypeScript + Tailwind + Prisma (PostgreSQL). Identidad visual **verde** (huerta y Camp de Túria).

## Stack

- Frontend: Next.js (App Router)
- Backend: API Routes de Next.js
- Base de datos: **PostgreSQL** (Docker con `docker-compose.yml`) + Prisma ORM y migraciones versionadas
- Estilos: Tailwind CSS
- CI/CD: GitHub Actions (CI + deploy por SSH en servidor)

## Base de datos (Docker)

En **produccion** la `DATABASE_URL` apunta a tu Postgres (a menudo `127.0.0.1:5432` o el puerto que use Docker alli).

En **local/producción**, el `docker-compose.yml` mapea el contenedor a **`127.0.0.1:5437`** (en el VPS: 5432 turnodejuego, 5434 lelianahoy, 5435 sermestre, 5436 sabhoy).

```bash
cp .env.example .env
make db-up
npx prisma migrate dev
npm run prisma:seed
npm run dev
```

`make db-down` para parar el contenedor. El volumen `beterahoy_pgdata` persiste los datos.

## Logo y favicon

El logo de cabecera y los favicons se generan desde `assets/logo-source.png`:

```bash
npm run brand:assets
```

Eso actualiza `public/branding/logo-beterahoy.png`, `public/icons/*`, `public/favicon.ico` y `app/icon.png`. Tras cambiar el logo, commitea esos ficheros y haz push a `main` (el deploy incluye `public/` en el bundle).

En el **servidor**, si hace falta regenerar a mano: `cd /opt/beterahoy.es && npm run brand:assets` (requiere `assets/logo-source.png` y `npm ci`).

Si el puerto del host aun asi lo tienes pillado, cambia en `docker-compose.yml` el mapeo (p. ej. `127.0.0.1:5437:5432`) y el mismo puerto en `DATABASE_URL` del `.env`.

## Diseno (fase 1)

- Home: heroe editorial (noticia con `isHero` o la mas reciente), accesos rapidos, feed de noticias, carril con actualizaciones y categorias, denuncias y evergreen
- **Categorias de noticias** (enum en Prisma): General, Politica local, Sucesos, Cultura, Deporte — filtros en `/noticias?categoria=...`
- **Tipografia** Source Sans 3 (Google Fonts), estilo local / periodico
- **SEO**: descripcion ampliada, metadatos Open Graph en noticias, JSON-LD `NewsArticle` en el detalle
- Ruta **Eventos** (`/eventos`) de momento informativa (calendario en fase posterior)

## Funcionalidades MVP

- Home con secciones anteriores
- Noticias:
  - Campos: `summary`, `category`, `isHero` (un solo heroe: el API limpia el resto)
  - CRUD por API (`/api/news`)
  - Listado publico con filtros (`/noticias`)
  - Detalle (`/noticias/[slug]`)
- Denuncias:
  - Formulario publico (`/denuncias/nueva`)
  - Flujo de estado (`pending`, `reviewed`, `published`)
  - Listado publico de publicadas (`/denuncias`)
- Informacion util:
  - Paginas evergreen (`/[slug]`)
  - Listado (`/informacion-util`)
  - Edicion desde admin
- Admin:
  - Cuentas con email/contrasena (NextAuth); quien es admin se define con `ADMIN_EMAILS` en `.env` (solo correos, no contrasenas en claro en el entorno)
  - Gestion de noticias, denuncias y paginas evergreen

## Rutas clave

- `/` inicio
- `/noticias`
- `/eventos` (placeholder)
- `/denuncias`
- `/denuncias/nueva`
- `/informacion-util`
- `/cuenta/registro`, `/cuenta/iniciar-sesion`
- `/admin` (solo usuarios con rol admin)

## Variables de entorno

Duplica `.env.example` a `.env` y revisa al menos `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` y `ADMIN_EMAILS` (emails de administradores; ver comentarios en el ejemplo).

### API de noticias (token)

Para **crear, editar o borrar noticias** sin usar el panel (`/admin`), define en `.env` un **`NEWS_API_TOKEN`** (cadena larga, mínimo 16 caracteres). El servidor lo lee en arranque.

**Cabeceras válidas** (una de las dos):

- `Authorization: Bearer <tu-token>`
- `X-API-Key: <tu-token>`

Si `NEWS_API_TOKEN` está vacío o no cumple la longitud mínima, solo seguirá valiendo la **sesión de admin** (cookie).

**Crear artículo (ejemplo):**

```bash
curl -sS -X POST "https://www.beterahoy.es/api/news" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "title": "Titular",
    "content": "Cuerpo del articulo...",
    "summary": "Resumen opcional para cards y SEO",
    "category": "GENERAL",
    "status": "draft",
    "isHero": false,
    "imageUrl": "https://..."
  }'
```

Categorias: `GENERAL`, `POLITICA_LOCAL`, `SUCESOS`, `CULTURA`, `DEPORTE`, `ELECCIONES_2027`.

**Borrador desde el monorepo** (lee `NEWS_API_TOKEN` de este `.env`):

```bash
node ../scripts/publish-news-draft.mjs beterahoy.es /ruta/payload.json
```

**Listado (GET /api/news)**: ahora es público; si quisieras ocultarlo, se puede añadir el mismo token en otra iteración.

### Comercios (directorio local)

Generador: `/generators/commerce-generator.md`. API: `POST/PATCH /api/comercios` (mismo token que noticias).

```bash
TURIAHOY_ENV_FILE=/tmp/prod.env node ../scripts/publish-commerce.mjs beterahoy.es /tmp/comercio.json
node ../scripts/upload-news-image.mjs beterahoy.es /ruta/foto.jpg
```

## Arranque local

Con PostgreSQL ya levantado (`make db-up`):

```bash
npm install
npx prisma migrate dev
npm run prisma:seed
npm run dev
```

En **produccion** (o CI) se usa `npm run prisma:deploy` (Prisma **5** del proyecto; no uses `npx prisma` a pelo, que puede instalar Prisma 7).

Nueva migracion `20250423120000_article_categories_hero` anade categorias y resumen a `Article` (tras pull: `npx prisma migrate deploy` en el server).

## Seed incluido

El seed crea:

- 3 noticias
- 5 denuncias
- 13 paginas evergreen (incluye las rutas solicitadas)

## GitHub Actions

- `.github/workflows/ci.yml`: instala, genera Prisma, lint y build.
- `.github/workflows/deploy-main.yml`: despliegue por SSH al hacer push en `main`, en `/opt/beterahoy.es`.

### Secrets necesarios para deploy

Configura en GitHub:

- `DEPLOY_HOST`: IP o dominio del servidor.
- `DEPLOY_USER`: usuario SSH con permisos en `/opt/beterahoy.es`.
- `DEPLOY_SSH_KEY`: clave privada SSH.
- `DEPLOY_PORT` (opcional): puerto SSH (por defecto `22`).
- `DEPLOY_SERVICE` (opcional): nombre del servicio systemd sin `.service` (por defecto `beterahoy`).

### Deploy automatico (sin entrar al server)

El workflow **compila en GitHub Actions** y sube un tarball al VPS. En el servidor **no** corre `npm ci` ni `next build` (la app sigue sirviendo hasta el restart final):

1. Build en GitHub Actions y subida de `deploy.tgz` a `/opt/beterahoy.es/.ci-stage/`.
2. En el VPS: extraer el bundle (`.next`, `node_modules`, `scripts/`, `prisma/`, etc.) — **sin `git fetch` en el servidor**.
3. `scripts/remote-deploy.sh`: `.env`, Postgres, `prisma migrate deploy`, reinicio systemd (puerto **3002**).

`prisma db seed` **no** va en el deploy automático. Ejecutalo a mano **una vez** tras el primer despliegue.

**La primera vez** en el servidor (`/opt/beterahoy.es`):

```bash
cp .env.example .env   # editar: NEXTAUTH_SECRET, ADMIN_EMAILS, contraseñas
# DATABASE_URL con puerto 5437 (5434 lelianahoy, 5436 sabhoy en el VPS típico)
docker compose up -d
make db-init           # npm ci + migrate + seeds (o los pasos de abajo)
make deploy            # build + systemd
```

Equivalente manual (siempre **después** de `npm ci`):

```bash
npm ci --include=dev
npm run prisma:deploy
npm run prisma:seed
npm run prisma:seed:evergreen
```

`.env` de ejemplo en producción:

```bash
DATABASE_URL="postgresql://beterahoy:beterahoy@127.0.0.1:5437/beterahoy"
NEXT_PUBLIC_SITE_URL="https://www.beterahoy.es"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
NEXTAUTH_URL="https://www.beterahoy.es"
ADMIN_EMAILS="tu@correo.com"
```

**No uses** `npx prisma …` sin haber hecho `npm ci`: `npx` puede descargar Prisma 7 y fallará con este schema (Prisma 5).

**Node en el server:** el proyecto se ha probado con Node 20+; en el server con Node 18 veras avisos `EBADENGINE` en `npm ci`. Recomendable: instalar Node 20 LTS (nvm o paquetes oficiales).

Con esto, cada push a `main` despliega automaticamente con los **secrets** configurados y, **una sola vez en el servidor**, la unidad systemd `beterahoy.service`.

### Crear el servicio systemd (una vez)

```bash
sudo cp /opt/beterahoy.es/deploy/beterahoy.service /etc/systemd/system/beterahoy.service
# User=deploy (mismo usuario SSH del deploy); no ejecutar Next como root
sudo chown -R deploy:deploy /opt/beterahoy.es
sudo systemctl daemon-reload
sudo systemctl enable beterahoy.service
```

Si el deploy falla al borrar `.next` (`Permission denied` en `cache/images`), como root: `sudo chown -R deploy:deploy /opt/beterahoy.es`. Opcional: `deploy/sudoers-deploy.snippet` para `sudo` sin contraseña en CI.

El **primer** `systemctl start` puede fallar hasta que existan `node_modules` y `.next` (tras el primer deploy por CI o `make db-init` + build).
