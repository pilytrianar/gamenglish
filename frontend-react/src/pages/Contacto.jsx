import { useContext, useState } from "react";
import axios from "axios";
import { TemaContext } from "../context/TemaContext";

function Contacto() {
  const tema = useContext(TemaContext);

  const [formulario, setFormulario] = useState({
    nombre: "",
    correo: "",
    mensaje: ""
  });

  const [respuesta, setRespuesta] = useState("");

  const manejarCambio = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();

    try {
      const resultado = await axios.post(
        "http://localhost:3000/contacto",
        formulario
      );

      setRespuesta(resultado.data.mensaje);

      setFormulario({
        nombre: "",
        correo: "",
        mensaje: ""
      });
    } catch (error) {
      setRespuesta("No fue posible enviar la solicitud.");
      console.log(error);
    }
  };

  return (
    <section className="section contacto">
      <h2>Contáctanos</h2>

      <p>Tema actual: {tema}</p>

      <form onSubmit={enviarFormulario}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
        />

        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={formulario.correo}
          onChange={manejarCambio}
        />

        <textarea
          name="mensaje"
          placeholder="Mensaje"
          value={formulario.mensaje}
          onChange={manejarCambio}
        ></textarea>

        <button type="submit">Enviar</button>
      </form>

      {respuesta && <p>{respuesta}</p>}
    </section>
  );
}

export default Contacto;