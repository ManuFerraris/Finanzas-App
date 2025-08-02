import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MovimientosFiltrados } from './pages/MovimientosFiltrados.tsx'
import { MetricasPorCategoria } from "./pages/MetricasPorCategoria.tsx";
import { GestionCategorias } from "./pages/GestionCategorias.tsx";
import { GestionMovimientos } from './pages/GestionMovimientos.tsx';
import { Home } from './components/Home.tsx';

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>Inicio</Link>
        <Link to="/movimientos" style={{ marginRight: "1rem" }}>Movimientos</Link>
        <Link to="/categorias" style={{ marginRight: "1rem" }}>Categorías</Link>
        <Link to="/metricas" style={{ marginRight: "1rem" }}>Métricas</Link>
        <Link to="/filtrados">Filtrados</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movimientos" element={<GestionMovimientos />} />
        <Route path="/categorias" element={<GestionCategorias />} />
        <Route path="/metricas" element={<MetricasPorCategoria />} />
        <Route path="/filtrados" element={<MovimientosFiltrados />} />
      </Routes>
    </Router>
  );
};

export default App;