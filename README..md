# 🎓 Proyecto Final - Gamenglish

Aplicación web full stack desarrollada con frontend en HTML, CSS y JavaScript, y backend en Node.js, Express y MongoDB.

---

## 📁 Estructura del proyecto

```text
ProyectoFinalUnidad1/
├── frontend/
├── backend/
├── documentos/
└── README.md
🔐 Credenciales de acceso
👨‍💼 Administrador

Correo: admin@hotmail.com

Contraseña: 123456

Permite:

Crear productos
Editar productos
Eliminar productos
Acceder a rutas protegidas de administrador

👤 Usuario normal

Correo: andrea@gmail.com

Contraseña: 123456

Permite:

Crear solicitudes
⚙️ 1. Requisitos de ejecución
📌 Requisitos
Node.js
npm
MongoDB Atlas
Postman
Navegador web
🚀 Ejecutar backend

Entrar a la carpeta backend:

cd backend

Instalar dependencias:

npm install

Crear archivo .env dentro de backend:

PORT=3000
MONGO_URI=tu_cadena_de_mongodb
JWT_SECRET=clavesecreta123

Ejecutar servidor:

npm run dev

Salida esperada:

Servidor corriendo en el puerto 3000
MongoDB conectado correctamente
🌐 Ejecutar frontend

Abrir:

frontend/index.html

O usar Live Server en VS Code.

📡 2. Diccionario de Endpoints
🔐 Autenticación
Método	Ruta	Descripción
POST	/api/auth/register	Registrar usuario
POST	/api/auth/login	Iniciar sesión
👥 Usuarios (CRUD completo)
Método	Ruta	Descripción
GET	/api/users	Listar todos los usuarios (admin)
GET	/api/users/:id	Obtener usuario por ID
PUT	/api/users/:id	Actualizar usuario
DELETE	/api/users/:id	Eliminar usuario
GET	/api/users/perfil	Perfil usuario autenticado
GET	/api/users/panel	Panel general
GET	/api/users/admin	Ruta solo admin

🔐 Header requerido:

Authorization: Bearer TOKEN
📨 Solicitudes
Método	Ruta	Descripción
POST	/api/solicitudes	Crear solicitud
GET	/api/solicitudes	Listar solicitudes
GET	/api/solicitudes/:id	Obtener solicitud por ID
PUT	/api/solicitudes/:id	Actualizar solicitud
DELETE	/api/solicitudes/:id	Eliminar solicitud
🛒 Productos
Método	Ruta	Descripción
POST	/api/productos	Crear producto
GET	/api/productos	Listar productos
PUT	/api/productos/:id	Actualizar producto
DELETE	/api/productos/:id	Eliminar producto

🔐 Requiere autenticación como administrador:

Authorization: Bearer TOKEN
📥 Ejemplos JSON
🔹 Registro
{
  "nombre": "Admin",
  "correo": "admin@hotmail.com",
  "password": "123456",
  "rol": "admin"
}
🔹 Login
{
  "correo": "admin@hotmail.com",
  "password": "123456"
}
🔹 Solicitud
{
  "nombreAcudiente": "Laura Gomez",
  "correo": "laura@gmail.com",
  "servicio": "Clases presenciales para niños",
  "mensaje": "Quiero información"
}
🔹 Producto
{
  "image": "https://imagen.com",
  "title": "Curso inglés",
  "description": "Clase para niños",
  "price": 50000,
  "coupon": "DESC50"
}
🧪 3. Evidencia de pruebas en Postman

Se realizaron pruebas de:

Registro de usuario
Inicio de sesión
Acceso con token
Validación de roles (admin y usuario)
CRUD completo de usuarios
CRUD de solicitudes
CRUD de productos
🔍 Pruebas de calidad
Campos vacíos
Correo inválido
Nombre con números
Acceso sin token
Usuario sin permisos

📸 Las evidencias se encuentran en:

documentos/
🧠 4. Explicación del DOM

El frontend utiliza una sola página:

frontend/index.html

Las vistas se controlan con JavaScript mediante manipulación del DOM:

function mostrarVista(idVista) {
  const vistas = document.querySelectorAll(".vista");

  vistas.forEach((vista) => {
    vista.classList.add("oculto");
  });

  const vistaSeleccionada = document.getElementById(idVista);

  if (vistaSeleccionada) {
    vistaSeleccionada.classList.remove("oculto");
  }
}
🧩 Vistas del sistema
Inicio
Servicios
Login
Registro
Solicitudes
Productos
🔐 Manejo de sesión

Se utiliza localStorage para guardar:

token
rol

Esto permite:

Controlar acceso
Validar roles
Proteger funcionalidades del sistema
✅ Estado del proyecto
Frontend con HTML, CSS, Bootstrap y JavaScript
Navegación dinámica mediante DOM
Backend con Node.js y Express
Base de datos MongoDB Atlas
Autenticación con JWT
Roles (admin y usuario)
CRUD de usuarios
CRUD de solicitudes
CRUD de productos
Validaciones de datos
Pruebas completas en Postman
👩‍💻 Autora

Andrea Triana