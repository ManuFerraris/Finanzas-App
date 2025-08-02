import { Link } from "react-router-dom";
import { CenteredLayout } from "../utils/CenteredLayout.tsx";

export function Home() {
    return (
        <CenteredLayout>
            <h1 style={{ marginBottom: "1rem", color: "#333" }}>
                Bienvenido a FinanzasApp 💰
            </h1>
            <p style={{ marginBottom: "2rem", color: "#555" }}>
                Gestioná tus movimientos, categorías y métricas de forma profesional.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <Link to="/movimientos" style={linkEstilo}>📋 Gestionar Movimientos</Link>
                <Link to="/categorias" style={linkEstilo}>🗂️ Gestionar Categorías</Link>
                <Link to="/metricas" style={linkEstilo}>📊 Ver Métricas por Categoría</Link>
                <Link to="/filtrados" style={linkEstilo}>🔍 Filtrar Movimientos</Link>
            </div>
        </CenteredLayout>
    );
}

const linkEstilo: React.CSSProperties = {
    display: "block",
    padding: "0.75rem 1rem",
    backgroundColor: "#f0f0f0",
    borderRadius: "6px",
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "background-color 0.2s"
};
