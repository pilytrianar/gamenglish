const express = require("express");
const router = express.Router();

const verificarToken = require("../middleware/authMiddleware");

const {
  crearSolicitud,
  listarSolicitudes,
  obtenerSolicitudPorId,
  actualizarSolicitud,
  eliminarSolicitud
} = require("../controllers/solicitudController");

router.post("/", verificarToken, crearSolicitud);
router.get("/", verificarToken, listarSolicitudes);
router.get("/:id", verificarToken, obtenerSolicitudPorId);
router.put("/:id", verificarToken, actualizarSolicitud);
router.delete("/:id", verificarToken, eliminarSolicitud);

module.exports = router;