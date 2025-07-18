import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import type { TooltipItem } from "chart.js";
import type { MetricaPorCategoria } from "../types/MetricaPorCategoria.ts";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = {
    datos: MetricaPorCategoria[];
};

export function GraficoBarrasCategorias({ datos }: Props) {
    const chartData = {
        labels: datos.map((m) => m.categoria),
        datasets: [
            {
                label: "Total por categoria",
                data: datos.map((m) => m.total),
                backgroundColor: datos.map((m) => m.color),
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" as const },
            tooltip: {
                callbacks: {
                    label: (ctx: TooltipItem<"bar">) => `$${ctx.formattedValue}`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value: string | number) {
                        return `$${Number(value).toLocaleString()}`;
                    },
                },
            },
        },
    };

return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
            <Bar data={chartData} options={chartOptions} />
    </div>
);
};