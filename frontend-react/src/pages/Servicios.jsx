import { useEffect, useState } from "react";
import axios from "axios";

function Servicios() {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const obtenerServicios = async () => {
      try {
        const respuesta = await axios.get("http://localhost:3000/servicios");
        setServicios(respuesta.data);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerServicios();
  }, []);

  return (
    <section className="section">
      <h2>Servicios</h2>

      <div className="cards">
        {servicios.map((servicio) => (
          <div className="card" key={servicio.id}>
            <h3>{servicio.nombre}</h3>
            <p>{servicio.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Servicios;