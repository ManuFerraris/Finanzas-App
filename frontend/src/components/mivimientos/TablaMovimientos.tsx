import { TipoTag } from "./TipoTag.tsx";
import { CategoriaTag } from "./CategoriaTag.tsx";
import type { Movimiento } from "../../types/Movimiento.ts";
import type { Categoria } from "../../types/Categoria.ts";

type Props = {
    movimientos: Movimiento[];
    categorias: Categoria[];
    onEliminar: (mov: Movimiento) => void;
    onEditar: (mov: Movimiento) => void;
};

export function TablaMovimientos({ movimientos, categorias, onEliminar, onEditar }: Props) {
    if (movimientos.length === 0) {
        return <p style={{ marginTop: "1rem" }}>No hay movimientos registrados aún.</p>;
    };
    
    if(categorias.length === 0) {
        return <p style={{ marginTop: "1rem" }}>No hay categorias registradas aún.</p>;
    };
    console.log("Movimientos recibidos en tabla:", movimientos);


    return (
        <table style={{ width: "105%", borderCollapse: "collapse" }}>
            <thead>
                <tr style={{ backgroundColor: "#a00996ff", color: "#fff" }}>
                <th style={{ padding: "0.5rem" }}>Fecha</th>
                <th style={{ padding: "0.5rem" }}>Descripción</th>
                <th style={{ padding: "0.5rem" }}>Tipo</th>
                <th style={{ padding: "0.5rem" }}>Monto</th>
                <th style={{ padding: "0.5rem" }}>Categoría</th>
                <th style={{ padding: "0.5rem" }}>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {movimientos.map((mov) => (
                    <tr key={mov.id}>
                        <td style={{ padding: "0.5rem" }}>
                            {new Date(mov.fecha).toLocaleDateString()}
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                            {mov.descripcion}
                        </td>
                        <td>
                            <TipoTag tipo={mov.tipo} />
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                            ${Number(mov.monto).toFixed(2)}
                        </td>
                        <td>
                            <CategoriaTag categoria={mov.categoria} />
                        </td>
                        <td style={{ padding: "0.5rem" }}>
                            <button
                                onClick={() => onEditar(mov)}
                                style={{
                                backgroundColor: "#3498db",
                                color: "#fff",
                                border: "none",
                                padding: "0.3rem 0.6rem",
                                borderRadius: "4px",
                                marginRight: "0.5rem",
                                cursor: "pointer"
                                }}
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onEliminar(mov)}
                                style={{
                                backgroundColor: "#e74c3c",
                                color: "#fff",
                                border: "none",
                                padding: "0.3rem 0.6rem",
                                borderRadius: "4px",
                                cursor: "pointer"
                                }}
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}