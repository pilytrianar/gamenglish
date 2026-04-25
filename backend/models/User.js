const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true
    },
    correo: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"]
    },
    rol: {
      type: String,
      enum: ["admin", "usuario"],
      default: "usuario"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);