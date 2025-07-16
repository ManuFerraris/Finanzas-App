import { useState } from "react";
import { getMetricasPorCategoria } from "../api/metricas";
import type { MetricaPorCategoria } from "../types/MetricaPorCategoria.ts";
import { FiltroMovimientos } from "../components/FiltroMovimientos.tsx";
import { GraficoCategorias } from "../components/GraficoCategorias.tsx";

export function MetricasPorCategoria() {
    const [metricas, setMetricas] = useState<MetricaPorCategoria[]>([]);
    const [error, setError] = useState<string | null>(null);

    const filtrar = (tipo: string, mes: string) => {
        getMetricasPorCategoria(tipo, mes).then(({ datos, error}) => {
            setMetricas(datos);
            setError(error);
        });
    };
return (
    <div>
        <h2>Métricas por categoría</h2>
        <FiltroMovimientos onFiltrar={filtrar} />

        {error ? (
            <p style={{ color: "red" }}>{error}</p>
        ) : metricas.length === 0 ? (
            <p>No hay métricas disponibles para esos filtros</p>
        ) : (
            <div>
                <GraficoCategorias datos={metricas} />
                <table>
                <thead>
                    <tr>
                    <th>Categoría</th>
                    <th>Total</th>
                    <th>Color</th>
                    </tr>
                </thead>
                <tbody>
                    {metricas.map((m, i) => (
                    <tr key={i}>
                        <td>
                            {m.categoria}
                        </td>
                        <td>${m.total.toLocaleString()}</td>
                        <td style={{ color: m.color }}>
                            <div style={{
                            display: "inline-block",
                            width: "16px",
                            height: "16px",
                            borderRadius: "4px",
                            backgroundColor: m.color,
                            marginRight: "0.5rem",
                            border: "1px solid #ccc"
                        }} />
                        <span style={{ color: m.color }}>{m.color}</span>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        )}
    </div>
);
}