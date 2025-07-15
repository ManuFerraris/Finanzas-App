import { useEffect, useState } from "react";
import { getMovimientosFiltrados } from "../api/movimientos";
import type { Movimiento } from "../types/Movimiento";

export function MovimientosFiltrados() {
    const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

    useEffect(() => {
        getMovimientosFiltrados("EGRESO", "2025-07").then(setMovimientos);
    }, []);

    return (
        <div>
            <h2>Movimientos de Julio - Egresos</h2>
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
                        <td style={{ color: m.categoria.color }}>{m.categoria.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};