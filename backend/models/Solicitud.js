const mongoose = require("mongoose");

const solicitudSchema = new mongoose.Schema(
  {
    nombreAcudiente: {
      type: String,
      required: [true, "El nombre del acudiente es obligatorio"],
      trim: true
    },
    correo: {
      type: String,
      required: [true, "El correo es obligatorio"],
      trim: true,
      lowercase: true
    },
    servicio: {
      type: String,
      required: [true, "El servicio es obligatorio"],
      trim: true
    },
    mensaje: {
      type: String,
      required: [true, "El mensaje es obligatorio"],
      trim: true
    },
    estado: {
      type: String,
      enum: ["pendiente", "en proceso", "resuelta"],
      default: "pendiente"
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Solicitud", solicitudSchema);