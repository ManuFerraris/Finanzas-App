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
        <table style={{ width: "100%", marginTop: "1rem" }}>
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Color</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {categorias.map((cat) => (
                <tr key={cat.nro}>
                    <td>{cat.nombre}</td>
                    <td>
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
                    <td>
                    <button onClick={() => onEditar(cat)} style={{ marginRight: "0.5rem" }}>
                        Editar
                    </button>
                    <button onClick={() => onEliminar(cat)} style={{ color: "red" }}>
                        Eliminar
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    );
}