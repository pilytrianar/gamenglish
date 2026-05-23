import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";
import "./App.css";
import { TemaContext } from "./context/TemaContext";

function App() {
  return (
  <TemaContext.Provider value={"modo claro"}>
  <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <h2>Gamenglish</h2>

          <div>
            <Link to="/">Inicio</Link>
            <Link to="/servicios">Servicios</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </div>
    </BrowserRouter>
</TemaContext.Provider>
  );
}

export default App;