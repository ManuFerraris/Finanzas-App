import { useState } from "react";
import { CenteredLayout } from "../utils/CenteredLayout.tsx";
import { getMetricasPorCategoria } from "../api/metricas.ts";
import type { MetricaPorCategoria } from "../types/MetricaPorCategoria.ts";
import { FiltroMovimientos } from "../components/FiltroMovimientos.tsx";
import { GraficoCategorias } from "../components/GraficoCategorias.tsx";
import { GraficoBarrasCategorias } from "../components/GraficoBarras.tsx";

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
    <CenteredLayout>
        <div style={{ padding: "1rem", color:"#555"}}>
            <h2 style={{backgroundColor: "#2cd8ffff"}}>Métricas por categoría</h2>
            <FiltroMovimientos onFiltrar={filtrar} />

            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : metricas.length === 0 ? (
                <p>No hay métricas disponibles para esos filtros</p>
            ) : (
                <div>
                    <GraficoCategorias datos={metricas} />
                    <GraficoBarrasCategorias datos={metricas} />
                    <h3>Detalles por categoría</h3>
                    <table style={{ width: "105%", borderCollapse: "collapse" }}>
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
    </CenteredLayout>
);
}