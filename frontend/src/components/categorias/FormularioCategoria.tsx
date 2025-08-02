import { useState } from 'react';

type Props = {
    onCrearCategoria: (data: { nombre:string, color:string } )=> void;
};

export function FormularioCategoria({ onCrearCategoria}: Props) {
    const [nombre, setNombre] = useState("");
    const [color, setColor] = useState("007AFF"); // Default color
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent)=> {
        e.preventDefault();
        if(!nombre.trim()){
            setError("El nombre es obligatirio");
            return;
        };
        setError("");
        onCrearCategoria({ nombre: nombre.trim(), color });
        setNombre("");
        setColor("#007AFF"); // Reset to default color
    };

    return (
        <form onSubmit={handleSubmit} style={formEstilo}>
            <div style={grupoEstilo}>
                <label htmlFor="nombre" style={labelEstilo}>Nombre de categoría:</label>
                <input
                    id="nombre"
                    type="text"
                    value={nombre}
                    placeholder="Ingrese el nombre"
                    onChange={(e) => setNombre(e.target.value)}
                    style={inputEstilo}
                />
            </div>

            <div style={grupoEstilo}>
                <label htmlFor="color" style={labelEstilo}>Color:</label>
                <input
                    id="color"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    style={colorInputEstilo}
                />
            </div>

            {error && <p style={{ color: "red", marginBottom: "0.5rem" }}>{error}</p>}

            <button type="submit" style={botonEstilo}>Crear categoría</button>
        </form>
    );
}

const formEstilo: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    maxWidth: "500px",
    margin: "0 auto"
};

const grupoEstilo: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem"
};

const labelEstilo: React.CSSProperties = {
    fontWeight: "bold",
    color: "#333"
};

const inputEstilo: React.CSSProperties = {
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc"
};

const colorInputEstilo: React.CSSProperties = {
    width: "60px",
    height: "30px",
    border: "none",
    cursor: "pointer"
};

const botonEstilo: React.CSSProperties = {
    padding: "0.6rem 1.2rem",
    backgroundColor: "#007AFF",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
};