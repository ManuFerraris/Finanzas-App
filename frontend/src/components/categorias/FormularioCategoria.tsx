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
        <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
            <div style={{ marginBottom: "0.5rem" }}>
                <label>
                Nombre de categoría:
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    style={{ marginLeft: "0.5rem" }}
                />
                </label>
            </div>

            <div style={{ marginBottom: "0.5rem" }}>
                <label>
                Color:
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    style={{ marginLeft: "0.5rem", verticalAlign: "middle" }}
                />
                </label>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit">Crear categoría</button>
        </form>
    );
}