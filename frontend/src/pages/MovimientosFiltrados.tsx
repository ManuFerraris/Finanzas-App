import { useState } from "react";
import { getMovimientosFiltrados } from "../api/movimientos";
import type { Movimiento } from "../types/Movimiento";
import { FiltroMovimientos } from "../components/FiltroMovimientos";

export function MovimientosFiltrados() {
    const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
    const [filtroActivo, setFiltroActivo] = useState<{ tipo: string; mes: string }>({
        tipo: "EGRESO", mes: "2025-07"
    });

    const filtrar = (tipo: string, mes: string) => {
        setFiltroActivo({ tipo, mes });
        getMovimientosFiltrados(tipo, mes)
            .then(setMovimientos);
        };

    return (
    <div>
        <h2>Movimientos filtrados</h2>
        <FiltroMovimientos onFiltrar={filtrar} />

        {movimientos.length === 0 ? (
            <p>No se encontraron movimientos para {filtroActivo.tipo} en {filtroActivo.mes}</p>
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
                    <td style={{ color: m.categoria.color }}>{m.categoria.nombre}</td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    );
};