const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let servicios = [
  {
    id: 1,
    nombre: "Presencial",
    descripcion: "Clases en espacios diseñados para niños."
  },
  {
    id: 2,
    nombre: "Virtual",
    descripcion: "Sesiones dinámicas e interactivas en línea."
  },
  {
    id: 3,
    nombre: "Domiciliario",
    descripcion: "Acompañamiento personalizado en casa."
  }
];

let mensajes = [];

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Gamenglish",
      version: "1.0.0",
      description: "Documentación de servicios REST para la aplicación Gamenglish"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./app.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /servicios:
 *   get:
 *     summary: Obtener lista de servicios de Gamenglish
 *     responses:
 *       200:
 *         description: Lista de servicios disponibles
 */
app.get("/servicios", (req, res) => {
  res.json(servicios);
});

/**
 * @swagger
 * /contacto:
 *   post:
 *     summary: Guardar mensaje enviado desde el formulario de contacto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               mensaje:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mensaje guardado correctamente
 */
app.post("/contacto", (req, res) => {
  const nuevoMensaje = {
    id: mensajes.length + 1,
    nombre: req.body.nombre,
    correo: req.body.correo,
    mensaje: req.body.mensaje
  };

  mensajes.push(nuevoMensaje);

  res.status(201).json({
    mensaje: "Solicitud recibida correctamente",
    datos: nuevoMensaje
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
  console.log(`Swagger disponible en http://localhost:${PORT}/api-docs`);
});