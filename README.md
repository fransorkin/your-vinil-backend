# 🎵 Your Vinyl - Backend API

> API REST para la gestión de colecciones de vinilos, autenticación de usuarios y sistema de comentarios.



---

## 📖 Descripción del Proyecto

**Your Vinyl Backend** es la API REST que alimenta la aplicación Your Vinyl. Proporciona endpoints seguros para la gestión de usuarios, autenticación JWT, CRUD de vinilos y sistema de comentarios. Construido con Node.js, Express y MongoDB.

### ✨ Características Principales

- 🔐 **Autenticación JWT** - Sistema seguro de registro e inicio de sesión con tokens
- 🎵 **API de Vinilos** - CRUD completo para gestión de vinilos
- 💬 **Sistema de Comentarios** - Endpoints para crear y gestionar comentarios
- 🛡️ **Middleware de Protección** - Rutas protegidas con validación de tokens
- 📊 **Base de datos MongoDB** - Persistencia de datos con Mongoose
- 🔄 **CORS configurado** - Comunicación segura con el frontend
- 📝 **Validación de datos** - Validaciones robustas en modelos

---

## 🚀 Inicio Rápido

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [MongoDB](https://www.mongodb.com/try/download/community) (versión 4.4 o superior)
- npm (incluido con Node.js)

### Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd our-cool-project-backend
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   PORT=
   ORIGIN=
   MONGO_URI=mongodb:
   JWT_SECRET=
   TOKEN_SECRET=
   NODE_ENV=
   ```

4. **Iniciar MongoDB**

   Asegúrate de que MongoDB esté corriendo en tu sistema:

   ```bash
   # Windows (si está instalado como servicio)
   net start MongoDB

   # macOS/Linux
   mongod
   ```

5. **Ejecutar en modo desarrollo**

   ```bash
   npm run dev
   ```

   El servidor estará disponible en `http://localhost:5005`

6. **Ejecutar en modo producción**

   ```bash
   npm start
   ```

---

## 📋 Seeders (Datos de Prueba)

Para poblar la base de datos con datos de ejemplo:

```bash
node seed.js
```

Este script creará usuarios y vinilos de prueba en tu base de datos.

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Node.js** | 18+ | Runtime de JavaScript |
| **Express** | 5.x | Framework web |
| **MongoDB** | 4.4+ | Base de datos NoSQL |
| **Mongoose** | 9.x | ODM para MongoDB |
| **JWT** | 9.x | Autenticación con tokens |
| **Bcrypt** | 6.x | Encriptación de contraseñas |
| **CORS** | 2.x | Manejo de políticas CORS |
| **Morgan** | 1.x | Logger HTTP |
| **Nodemon** | 3.x | Auto-reload en desarrollo |

---

## 📁 Estructura del Proyecto

```
our-cool-project-backend/
│
├── config/
│   └── index.js           # Configuración de middleware
│
├── db/
│   └── index.js           # Conexión a MongoDB
│
├── error-handling/
│   └── index.js           # Manejo de errores
│
├── middleware/
│   ├── auth.js            # Middleware de autenticación
│   └── jwt.middleware.js  # Validación de JWT
│
├── models/
│   ├── User.model.js      # Modelo de usuario
│   ├── Vinyl.model.js     # Modelo de vinilo
│   └── Comment.model.js   # Modelo de comentario
│
├── routes/
│   ├── index.routes.js    # Rutas base
│   ├── auth.routes.js     # Rutas de autenticación
│   ├── vinyls.routes.js   # Rutas de vinilos
│   └── comments.routes.js # Rutas de comentarios
│
├── .env                   # Variables de entorno (crear manualmente)
├── .gitignore             # Archivos ignorados por git
├── app.js                 # Configuración de Express
├── server.js              # Punto de entrada
├── seed.js                # Script de seeders
└── package.json           # Dependencias del proyecto
```

---

## 🔌 Endpoints de la API

### Autenticación

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/signup` | Registrar nuevo usuario | No |
| `POST` | `/api/auth/login` | Iniciar sesión | No |
| `GET` | `/api/auth/verify` | Verificar token | Sí |

### Vinilos

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `GET` | `/api/vinyls` | Obtener todos los vinilos | No |
| `GET` | `/api/vinyls/:id` | Obtener un vinilo por ID | No |
| `POST` | `/api/vinyls` | Crear nuevo vinilo | Sí |
| `PUT` | `/api/vinyls/:id` | Actualizar vinilo | Sí |
| `DELETE` | `/api/vinyls/:id` | Eliminar vinilo | Sí |

### Comentarios

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `GET` | `/api/vinyls/:id/comments` | Obtener comentarios de un vinilo | No |
| `POST` | `/api/vinyls/:id/comments` | Crear comentario | Sí |
| `DELETE` | `/api/comments/:id` | Eliminar comentario | Sí |

> 📝 **Nota:** Los endpoints marcados con "Sí" requieren un token JWT en el header `Authorization: Bearer <token>`

---

## 📜 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor en modo producción |
| `npm run dev` | Inicia el servidor con nodemon (auto-reload) |
| `node seed.js` | Ejecuta el script de seeders |

---

## 🔐 Autenticación

La API utiliza **JWT (JSON Web Tokens)** para autenticación. 

### Flujo de autenticación:

1. El usuario se registra o inicia sesión
2. El servidor genera un token JWT
3. El cliente almacena el token (localStorage/sessionStorage)
4. El cliente incluye el token en cada petición protegida:
   ```
   Authorization: Bearer <token>
   ```
5. El middleware verifica el token antes de procesar la petición

---

## 🗄️ Modelos de Datos

### User

```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  name: String,
  createdAt: Date
}
```

### Vinyl

```javascript
{
  title: String (required),
  artist: String (required),
  year: Number,
  genre: String,
  coverImage: String,
  description: String,
  owner: ObjectId (ref: User),
  createdAt: Date
}
```

### Comment

```javascript
{
  content: String (required),
  author: ObjectId (ref: User),
  vinyl: ObjectId (ref: Vinyl),
  createdAt: Date
}
```

---






## 🚀 Despliegue

### Preparación para producción:

1. **Cambiar variables de entorno:**
   - Actualiza `ORIGIN` con la URL de tu frontend en producción
   - Usa `MONGO_URI` de MongoDB Atlas u otro servicio
   - Genera secretos JWT seguros

2. **Servicios recomendados:**
   - **Hosting:** [Render](https://render.com/), [Railway](https://railway.app/), [Fly.io](https://fly.io/)
   - **Base de datos:** [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🐛 Reporte de Bugs

Si encuentras un bug, por favor abre un [issue](link-to-issues) describiendo:

- Descripción del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Logs de error (si aplica)

---

## 📧 Contacto

Si tienes preguntas o sugerencias, no dudes en contactar al equipo de desarrollo.

---

<div align="center">

**¡Construyamos juntos la mejor API para coleccionistas de vinilos! 🎶**

⭐ Si te gusta este proyecto, considera darle una estrella en GitHub

</div>
