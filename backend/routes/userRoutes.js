const express = require("express");
const router = express.Router();

const verificarToken = require("../middleware/authMiddleware");
const verificarRol = require("../middleware/roleMiddleware");

const User = require("../models/User");

// GET perfil del usuario autenticado
router.get("/perfil", verificarToken, (req, res) => {
  res.json({
    mensaje: "Bienvenido a tu perfil",
    usuario: req.usuario
  });
});

// RUTAS ADICIONALES 
router.get("/admin", verificarToken, verificarRol("admin"), (req, res) => {
  res.json({ mensaje: "Bienvenido administrador" });
});

router.get("/panel", verificarToken, verificarRol("admin", "usuario"), (req, res) => {
  res.json({ mensaje: "Acceso al panel general" });
});

// GET todos los usuarios (SOLO ADMIN)
router.get("/", verificarToken, verificarRol("admin"), async (req, res) => {
  try {
    const usuarios = await User.find().select("-password");
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener usuarios",
      error: error.message
    });
  }
});

// GET usuario por ID (ADMIN)
router.get("/:id", verificarToken, verificarRol("admin"), async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id).select("-password");

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al buscar usuario",
      error: error.message
    });
  }
});

// PUT actualizar usuario
router.put("/:id", verificarToken, async (req, res) => {
  try {
    if (req.usuario.rol !== "admin" && req.usuario.id !== req.params.id) {
      return res.status(403).json({
        mensaje: "No tienes permiso para actualizar este usuario"
      });
    }

    const usuarioActualizado = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    res.json({
      mensaje: "Usuario actualizado correctamente",
      usuario: usuarioActualizado
    });

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar usuario",
      error: error.message
    });
  }
});

// DELETE eliminar usuario (SOLO ADMIN)
router.delete("/:id", verificarToken, verificarRol("admin"), async (req, res) => {
  try {
    const usuario = await User.findByIdAndDelete(req.params.id);

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado"
      });
    }

    res.json({
      mensaje: "Usuario eliminado correctamente"
    });

  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar usuario",
      error: error.message
    });
  }
});

module.exports = router;