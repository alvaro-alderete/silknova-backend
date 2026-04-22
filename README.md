# SilkNova Backend

API REST del proyecto final desarrollado para **RollingCode**.

**SilkNova** es una tienda de ropa online. Este repositorio contiene el backend que gestiona la autenticación de usuarios, el catálogo de productos, categorías, favoritos y carrito de compras.

---

## Autor

**Alvaro Agustín Roldan Alderete**  
Proyecto Final — RollingCode

---

## Tecnologías

- **Node.js** + **Express 5**
- **MongoDB** + **Mongoose**
- **JWT** — autenticación con tokens
- **bcryptjs** — encriptación de contraseñas
- **Nodemailer** — envío de emails (recuperación de contraseña)
- **dotenv** — variables de entorno
- **CORS**

---

## Estructura del proyecto

```
silknova-backend/
├── src/
│   ├── config/         # Conexión a la base de datos
│   ├── controllers/    # Lógica de cada recurso
│   ├── middlewares/    # Middleware de autenticación JWT
│   ├── models/         # Esquemas de Mongoose
│   ├── routes/         # Definición de rutas
│   ├── services/       # Capa de servicios
│   ├── utils/          # Utilidades (email, password)
│   └── index.js        # Punto de entrada
└── seeder/             # Script para poblar la base de datos
```

---

## Modelos

| Modelo     | Descripción                                                                 |
|------------|-----------------------------------------------------------------------------|
| `User`     | Usuario con nombre, email, password, favoritos y carrito embebidos          |
| `Product`  | Producto con nombre, precio, imágenes, talle, color, género, stock y más    |
| `Category` | Categoría de productos                                                      |
| `Cart`     | Carrito de compras del usuario                                              |
| `Favorite` | Productos favoritos del usuario                                             |

---

## Endpoints

### Auth — `/api/auth`

| Método | Ruta                    | Descripción                        | Auth |
|--------|-------------------------|------------------------------------|------|
| POST   | `/registro`             | Registrar nuevo usuario            | No   |
| POST   | `/login`                | Iniciar sesión, devuelve JWT       | No   |
| GET    | `/perfil`               | Obtener perfil del usuario         | Sí   |
| POST   | `/recuperar-contrasena` | Enviar email de recuperación       | No   |
| POST   | `/resetear-contrasena`  | Resetear contraseña con token      | No   |

### Productos — `/api/products`

| Método | Ruta           | Descripción                        |
|--------|----------------|------------------------------------|
| GET    | `/`            | Listar todos los productos         |
| GET    | `/:urlNombre`  | Obtener producto por URL amigable  |
| POST   | `/`            | Crear producto                     |
| PUT    | `/:id`         | Actualizar producto                |
| DELETE | `/:id`         | Eliminar producto                  |

### Categorías — `/api/categories`

| Método | Ruta    | Descripción             |
|--------|---------|-------------------------|
| GET    | `/`     | Listar categorías       |
| POST   | `/`     | Crear categoría         |
| PUT    | `/:id`  | Actualizar categoría    |
| DELETE | `/:id`  | Eliminar categoría      |

### Carrito — `/api/cart` 🔒

| Método | Ruta       | Descripción                        |
|--------|------------|------------------------------------|
| GET    | `/`        | Obtener carrito del usuario        |
| GET    | `/summary` | Resumen del carrito (total, items) |
| POST   | `/items`   | Agregar producto al carrito        |
| PUT    | `/items`   | Actualizar cantidad de un item     |
| DELETE | `/items`   | Eliminar un item del carrito       |
| DELETE | `/`        | Vaciar el carrito                  |

### Favoritos — `/api/favorites` 🔒

| Método | Ruta    | Descripción                        |
|--------|---------|-------------------------------------|
| GET    | `/`     | Obtener favoritos del usuario       |
| POST   | `/`     | Agregar producto a favoritos        |
| DELETE | `/:id`  | Eliminar producto de favoritos      |

> 🔒 Requiere token JWT en el header: `Authorization: Bearer <token>`

---

## Instalación y uso

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd silknova-backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# Correr en desarrollo
npm run dev

# Correr en producción
npm start
```

### Variables de entorno requeridas

```env
PORT=3000
MONGO_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/silknova
JWT_SECRET=<tu_secreto_jwt>
EMAIL_USER=<email>
EMAIL_PASS=<password_email>
```

### Seeder

Para poblar la base de datos con datos de prueba:

```bash
npm run seed
```
