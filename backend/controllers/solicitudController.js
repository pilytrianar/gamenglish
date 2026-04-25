const Solicitud = require("../models/Solicitud");

const crearSolicitud = async (req, res) => {
  try {
    const { nombreAcudiente, correo, servicio, mensaje } = req.body;

    if (!nombreAcudiente || !correo || !servicio || !mensaje) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios"
      });
    }

    const nombreValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!nombreValido.test(nombreAcudiente)) {
      return res.status(400).json({
        mensaje: "El nombre del acudiente solo debe contener letras"
      });
    }

    const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoValido.test(correo)) {
      return res.status(400).json({
        mensaje: "El correo no tiene un formato válido"
      });
    }

    const nuevaSolicitud = new Solicitud({
      nombreAcudiente,
      correo,
      servicio,
      mensaje,
      usuario: req.usuario.id
    });

    await nuevaSolicitud.save();

    res.status(201).json({
      mensaje: "Solicitud creada correctamente",
      solicitud: nuevaSolicitud
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al crear la solicitud",
      error: error.message
    });
  }
};

const listarSolicitudes = async (req, res) => {
  try {
    let solicitudes;

    if (req.usuario.rol === "admin") {
      solicitudes = await Solicitud.find().populate("usuario", "nombre correo rol");
    } else {
      solicitudes = await Solicitud.find({ usuario: req.usuario.id });
    }

    res.status(200).json(solicitudes);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al listar solicitudes",
      error: error.message
    });
  }
};

const obtenerSolicitudPorId = async (req, res) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id);

    if (!solicitud) {
      return res.status(404).json({
        mensaje: "Solicitud no encontrada"
      });
    }

    if (
      req.usuario.rol !== "admin" &&
      solicitud.usuario.toString() !== req.usuario.id
    ) {
      return res.status(403).json({
        mensaje: "No tienes permiso para ver esta solicitud"
      });
    }

    res.status(200).json(solicitud);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener la solicitud",
      error: error.message
    });
  }
};

const actualizarSolicitud = async (req, res) => {
  try {
    const { nombreAcudiente, correo, servicio, mensaje, estado } = req.body;

    const solicitud = await Solicitud.findById(req.params.id);

    if (!solicitud) {
      return res.status(404).json({
        mensaje: "Solicitud no encontrada"
      });
    }

    if (
      req.usuario.rol !== "admin" &&
      solicitud.usuario.toString() !== req.usuario.id
    ) {
      return res.status(403).json({
        mensaje: "No tienes permiso para editar esta solicitud"
      });
    }

    solicitud.nombreAcudiente = nombreAcudiente || solicitud.nombreAcudiente;
    solicitud.correo = correo || solicitud.correo;
    solicitud.servicio = servicio || solicitud.servicio;
    solicitud.mensaje = mensaje || solicitud.mensaje;

    if (req.usuario.rol === "admin" && estado) {
      solicitud.estado = estado;
    }

    await solicitud.save();

    res.status(200).json({
      mensaje: "Solicitud actualizada correctamente",
      solicitud
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar solicitud",
      error: error.message
    });
  }
};

const eliminarSolicitud = async (req, res) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id);

    if (!solicitud) {
      return res.status(404).json({
        mensaje: "Solicitud no encontrada"
      });
    }

    if (
      req.usuario.rol !== "admin" &&
      solicitud.usuario.toString() !== req.usuario.id
    ) {
      return res.status(403).json({
        mensaje: "No tienes permiso para eliminar esta solicitud"
      });
    }

    await solicitud.deleteOne();

    res.status(200).json({
      mensaje: "Solicitud eliminada correctamente"
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar solicitud",
      error: error.message
    });
  }
};

module.exports = {
  crearSolicitud,
  listarSolicitudes,
  obtenerSolicitudPorId,
  actualizarSolicitud,
  eliminarSolicitud
};