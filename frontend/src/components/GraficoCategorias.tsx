import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { MetricaPorCategoria } from "../types/MetricaPorCategoria.ts";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    datos: MetricaPorCategoria[];
};

export function GraficoCategorias( { datos }: Props) {
    const chartData = {
        lebels: datos.map((m)=> m.categoria),
        datasets: [
            {
                data: datos.map((m)=> m.total),
                backgroundColor: datos.map((m) => m.color),
                borderColor: "#fff",
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
            <Pie data={chartData}/>
        </div>
    );
};