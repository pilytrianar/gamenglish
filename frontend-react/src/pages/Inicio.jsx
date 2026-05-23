import { useReducer } from "react";
import { contadorReducer, estadoInicial } from "../context/contadorReducer";

function Inicio() {

  const [state, dispatch] = useReducer(
    contadorReducer,
    estadoInicial
  );

  return (

    <section className="hero">

      <h1>Aprender inglés jugando</h1>

      <p>
        Gamenglish es una propuesta educativa para niños que busca enseñar
        inglés mediante actividades lúdicas y experiencias significativas.
      </p>

      <button>
        Solicitar información
      </button>

      <h3>
        Contador: {state.contador}
      </h3>

      <div style={{ marginTop: "20px" }}>

        <button
          onClick={() =>
            dispatch({ type: "incrementar" })
          }
        >
          +
        </button>

        <button
          onClick={() =>
            dispatch({ type: "disminuir" })
          }
          style={{ marginLeft: "10px" }}
        >
          -
        </button>

      </div>

    </section>
  );
}

export default Inicio;