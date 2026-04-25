const express = require("express");
const router = express.Router();
const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/roleMiddleware");

// Ruta para cualquier usuario autenticado
router.get("/perfil", verificarToken, (req, res) => {
  res.json({
    mensaje: "Bienvenido a tu perfil",
    usuario: req.usuario
  });
});

// Ruta solo para admin
router.get("/admin", verificarToken, verificarRol("admin"), (req, res) => {
  res.json({
    mensaje: "Bienvenido administrador"
  });
});

// Ruta para admin y usuario
router.get("/panel", verificarToken, verificarRol("admin", "usuario"), (req, res) => {
  res.json({
    mensaje: "Acceso al panel general"
  });
});

module.exports = router;