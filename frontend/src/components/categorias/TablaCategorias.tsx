type Categoria = {
    nro: number;
    nombre: string;
    color: string;
};

type Props = {
    categorias: Categoria[];
    onEliminar: (categoria: Categoria) => void;
    onEditar: (categoria: Categoria) => void;
};

export function TablaCategorias({ categorias, onEditar, onEliminar}: Props) {
    if(categorias.length === 0) {
        return <p>No hay categorías disponibles.</p>;
    };

    return (
        <table style={{ width: "105%", borderCollapse: "collapse" }}>
            <thead>
                <tr style={{ backgroundColor: "#a00996ff", color: "#fff" }}>
                <th style={{ padding: "0.5rem" }}>Nombre</th>
                <th style={{ padding: "0.5rem" }}>Color</th>
                <th style={{ padding: "0.5rem" }}>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {categorias.map((cat) => (
                <tr key={cat.nro} style={{ color: "#000", backgroundColor: "#fff" }}>
                    <td style={{ padding: "0.5rem" }}>{cat.nombre}</td>
                    <td style={{ padding: "0.5rem" }}>
                        <div style={{
                            display: "inline-block",
                            width: "24px",
                            height: "24px",
                            backgroundColor: cat.color,
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }} />
                        <span style={{ marginLeft: "0.5rem" }}>{cat.color}</span>
                    </td>
                    <td style={{ padding: "0.5rem" }}>
                        <button onClick={() => onEditar(cat)} style={botonEstiloEditar}>
                            Editar
                        </button>
                        <button onClick={() => onEliminar(cat)} style={botonEstiloEliminar}>
                            Eliminar
                        </button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    );
}

const botonEstiloEliminar: React.CSSProperties = {
    padding: "0.5rem 1rem",
    backgroundColor: "#d51f1fff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold"
};

const botonEstiloEditar: React.CSSProperties = {
    padding: "0.5rem 1rem",
    backgroundColor: "#3084cdff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold"
};