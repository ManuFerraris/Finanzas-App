import { useState } from "react";
import { CenteredLayout } from "../utils/CenteredLayout.tsx";
import { getMovimientosFiltrados } from "../api/movimientos";
import type { Movimiento } from "../types/Movimiento";
import { FiltroMovimientos } from "../components/FiltroMovimientos";
import { calcularTotal } from "../utils/calcularTotal";

export function MovimientosFiltrados() {
    const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
    const [/*filtroActivo*/, setFiltroActivo] = useState<{ tipo: string; mes: string }>({
        tipo: "EGRESO", mes: "2025-07"
    });
    const [error, setError] = useState<string | null>(null);
    const total = calcularTotal(movimientos);

    const filtrar = (tipo: string, mes: string) => {
        setFiltroActivo({ tipo, mes });
        getMovimientosFiltrados(tipo, mes).then(({ datos, error }) => {
            setMovimientos(datos);
            setError(error);
        });
    };

    return (
        <CenteredLayout>
            <div style={{ padding: "1rem", color:"#555"}}>
                <h2 style={{backgroundColor: "#2cd8ffff"}}>Movimientos filtrados</h2>
                <FiltroMovimientos onFiltrar={filtrar} />

                {error ? (
                    <p style={{ color: "red" }}>{error}</p>
                ) : movimientos.length === 0 ? (
                    <p>No hay movimientos cargados en el frontend.</p>
                ) : (
                    <table>
                    <thead>
                        <tr>
                        <th>Descripción</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                        <th>Categoría</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movimientos.map((m, i) => (
                        <tr key={i}>
                            <td>{m.descripcion}</td>
                            <td>${m.monto}</td>
                            <td>{new Date(m.fecha).toLocaleDateString()}</td>
                            <td style={{ color: m.categoria?.color }}>{m.categoria?.nombre}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                )}

                {movimientos.length > 0 && (
                    <div style={{ marginBottom: "1rem", padding: "1rem", background: "#f1f1f1", color: "#1A7D1A", fontWeight: "bold" }}>
                        <strong>Total del período:</strong> ${total.toLocaleString()}
                    </div>
                )}
            </div>
        </CenteredLayout>
    );
};