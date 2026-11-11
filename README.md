# Nutresa · Front de Videos Corporativos

Front en React + Vite + Tailwind CSS + react-router-dom.

```bash
npm install
npm run dev
```

## Rutas

| Ruta | Descripción |
| --- | --- |
| `/` | Inicio: elegir Registrarme o Iniciar sesión |
| `/registro` | Formulario de registro (con confirmar contraseña) |
| `/login` | Inicio de sesión contra la cuenta registrada |
| `/home` | Plataforma de videos (requiere sesión) |

## Modelo del registro (backend Java)

`id` (UUID), `nombre`, `correo`, `rol`, `departamento`, `constrasenia_hash` (SHA-256 en el cliente).

El registro se simula en `localStorage` (`src/utils/storage.js`); allí es donde se conectaría la API real.

## Estructura

```
src/
  components/  Logo, Campo, Header, VideoCard
  pages/       Bienvenida, RegistroPage, LoginPage, HomePage
  data/        videos.js (datos simulados)
  utils/       storage.js (UUID, hash, persistencia y sesión)
```
