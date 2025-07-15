import { MovimientoRepository } from "../../interfaces/MovimientoRepository.ts";

export class ObtenerMetricasPorCategoria {
    constructor(private readonly repo: MovimientoRepository) {};

    async ejecutar(tipo: string, mes:string): Promise<{ categoria: string; color: string; total: number }[]> {
        const [anio, mesNumero] = mes.split('-').map(Number);
        const desde = new Date(anio, mesNumero - 1, 1);
        const hasta = new Date(anio, mesNumero, 1);

        const movimientos = await this.repo.buscarPorTipoYFecha(tipo, desde, hasta);

        const agrupado = movimientos.reduce((map, movimiento) => {
            const key = movimiento.categoria?.nombre ?? "Sin categoría";
            const color = movimiento.categoria?.color ?? "#CCCCCC";

            if (!map[key]) map[key] = { categoria: key, color, total: 0 };
            map[key].total += Number(movimiento.monto);
            return map;
        },
        {} as Record<string, { categoria: string; color: string; total: number }>);

        return Object.values(agrupado);
    };
};