const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Registrar usuario
const register = async (req, res) => {
  try {
    const { nombre, correo, password, rol } = req.body;

    // Validaciones básicas
    if (!nombre || !correo || !password) {
      return res.status(400).json({
        mensaje: "Nombre, correo y contraseña son obligatorios"
      });
    }

    // Validar que el nombre no tenga números
    const nombreValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    if (!nombreValido.test(nombre)) {
      return res.status(400).json({
        mensaje: "El nombre solo debe contener letras"
      });
    }

    // Validar longitud mínima de contraseña
    if (password.length < 6) {
      return res.status(400).json({
        mensaje: "La contraseña debe tener mínimo 6 caracteres"
      });
    }

    // Verificar si ya existe el correo
    const usuarioExistente = await User.findOne({ correo });
    if (usuarioExistente) {
      return res.status(400).json({
        mensaje: "Ya existe un usuario con ese correo"
      });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordEncriptada = await bcrypt.hash(password, salt);

    // Crear usuario
    const nuevoUsuario = new User({
      nombre,
      correo,
      password: passwordEncriptada,
      rol: rol || "usuario"
    });

    await nuevoUsuario.save();

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        rol: nuevoUsuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al registrar usuario",
      error: error.message
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({
        mensaje: "Correo y contraseña son obligatorios"
      });
    }

    // Buscar usuario
    const usuario = await User.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        mensaje: "Credenciales inválidas"
      });
    }

    // Comparar contraseña
    const passwordCorrecta = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecta) {
      return res.status(400).json({
        mensaje: "Credenciales inválidas"
      });
    }

    // Crear token
    const token = jwt.sign(
      {
        id: usuario._id,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      mensaje: "Login exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error en el login",
      error: error.message
    });
  }
};

module.exports = {
  register,
  login
};