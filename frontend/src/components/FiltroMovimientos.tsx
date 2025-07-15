import { useState } from "react";
type Props = {
    onFiltrar: (tipo: string, mes: string) => void;
};

export function FiltroMovimientos({ onFiltrar }: Props) {
    const [tipo, setTipo] = useState("INGRESO");
    const [mes, setMes] = useState("2025-07");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onFiltrar(tipo, mes);
    };

    return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "1rem" }}>
            Tipo:
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="ingreso">Ingreso</option>
                <option value="egreso">Egreso</option>
            </select>
        </label>

        <label style={{ marginRight: "1rem" }}>
            Mes:
            <input type="month" value={mes} onChange={(e) => setMes(e.target.value)} />
        </label>

        <button type="submit">Filtrar</button>
    </form>
    );
}