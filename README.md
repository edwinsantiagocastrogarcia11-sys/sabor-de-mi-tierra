# Sabor de mi tierra

Sitio web de un restaurante de comida típica colombiana. Proyecto final de **Jóvenes Creativos** (ruta básica, "Mi emprendimiento digital").

- **Página publicada:** https://edwinsantiagocastrogarcia11-sys.github.io/sabor-de-mi-tierra/
- **API (backend):** https://sabor-de-mi-tierra.onrender.com/api/platos

> La API está en el plan gratuito de Render: si nadie la usa, se "duerme" y la primera petición puede tardar hasta un minuto.

## Qué incluye

- **Landing** con presentación del restaurante.
- **Catálogo de platos** que se carga desde una base de datos.
- **Contacto real:** el formulario guarda los mensajes en la base de datos.
- **Panel de administración** con login: agregar, editar y borrar platos, y leer los mensajes recibidos.
- **IA aplicada:** un recomendador de platos que usa Gemini (Google). Si la IA no está disponible, usa una búsqueda por palabras clave como respaldo.
- **Diseño responsive** para celular y computador.

## Tecnologías

| Parte | Herramientas |
|---|---|
| Frontend | React, Vite, react-router-dom (HashRouter), CSS |
| Backend | Node.js, Express, Mongoose |
| Base de datos | MongoDB Atlas |
| IA | API de Gemini (Google) |
| Publicación | GitHub Pages (frontend, con GitHub Actions) y Render (backend) |
| Control de versiones | Git y GitHub |

## Cómo funciona

1. El frontend (React) pide los datos a la API con `fetch`.
2. El backend (Express) recibe la petición, consulta MongoDB y responde en JSON.
3. El panel admin pide un **token** al iniciar sesión. El servidor lo firma con HMAC y expira a las 2 horas. Las rutas para crear, editar y borrar platos exigen ese token.
4. El recomendador envía lo que escribe el cliente y la lista de platos a Gemini, que elige las mejores opciones. Si falla, el servidor calcula una puntuación por palabras clave.

## Rutas de la API

| Método | Ruta | Descripción | ¿Requiere admin? |
|---|---|---|---|
| GET | `/api/platos` | Lista los platos | No |
| POST | `/api/platos` | Crea un plato | Sí |
| PUT | `/api/platos/:id` | Edita un plato | Sí |
| DELETE | `/api/platos/:id` | Borra un plato | Sí |
| POST | `/api/contacto` | Guarda un mensaje | No |
| POST | `/api/recomendar` | Recomienda platos con IA | No |
| POST | `/api/admin/login` | Inicia sesión y entrega el token | No |
| GET | `/api/admin/mensajes` | Lista los mensajes recibidos | Sí |

## Estructura

```
sabor de mi tierra/
├── backend/
│   └── src/
│       ├── config/       conexión a la base de datos
│       ├── middleware/   autenticación del admin
│       ├── models/       modelos Plato y Contacto
│       ├── routes/       rutas de la API
│       ├── app.js
│       └── server.js
├── frontend/
│   ├── public/img/       imágenes de los platos
│   └── src/
│       ├── components/   Header, Menu, PlatoCard, Recomendador, Contacto, etc.
│       ├── pages/        Inicio y Admin
│       └── utils/        funciones de ayuda (api.js, irA.js)
└── .github/workflows/    publicación automática en GitHub Pages
```

## Cómo ejecutarlo en tu computador

Necesitas Node.js y una base de datos MongoDB (por ejemplo, MongoDB Atlas).

**1. Backend**

```bash
cd backend
npm install
```

Crea un archivo `backend/.env` con estas variables (usa tus propios valores):

```
MONGODB_URI=tu_cadena_de_conexion
ADMIN_USER=tu_usuario
ADMIN_PASSWORD=tu_contraseña
ADMIN_SECRET=una_clave_larga_y_secreta
GEMINI_API_KEY=tu_clave_de_gemini
```

```bash
npm run seed   # carga los platos iniciales
npm run dev    # arranca el servidor en http://localhost:3000
```

**2. Frontend** (en otra terminal)

```bash
cd frontend
npm install
```

Crea un archivo `frontend/.env`:

```
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

## Seguridad

- Las claves y contraseñas viven en variables de entorno y **no** se suben al repositorio (`.env` está en `.gitignore`).
- Las rutas de administración están protegidas con un token que caduca.
- La API solo acepta peticiones del sitio publicado (CORS con `FRONTEND_URL`).

## Autor

Edwin Castro, proyecto final de Jóvenes Creativos.
