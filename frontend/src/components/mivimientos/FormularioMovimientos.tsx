import { useEffect, useState } from 'react';
import { validarMovimiento } from '../../utils/validarMovimiento.ts';
import { getCategorias } from '../../api/categorias.ts';
import type { Categoria } from '../../types/Categoria.ts';
import type { TipoMovimiento } from '../../types/Movimiento.ts';

type Props = {
    onCrearMovimiento: (data: { 
        descripcion: string; 
        monto: number; 
        fecha: Date; 
        tipo: string; 
        categoriaId?: number;
    } )=> void;
    categorias: Categoria[];
};

export function FormularioMovimiento({ onCrearMovimiento }: Props) {
    const [descripcion, setDescripcion] = useState("");
    const [monto, setMonto] = useState(0);
    const [fecha, setFecha] = useState(new Date().toISOString().substring(0, 10));
    const [tipo, setTipo] = useState("");
    const [idCategoria, setIdCategoria] = useState<number | null>(null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loadingCats, setLoadingCats] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getCategorias().then(({ datos, error }) => {
            if (!error && datos) {
            setCategorias(datos);
            } else {
            console.error("Error al cargar categorías:", error);
            }
            setLoadingCats(false);
        });
    }, []);

    if (loadingCats) {
        return <p>Cargando categorías...</p>;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const nuevoMovimiento = {
            descripcion: descripcion.trim(),
            monto: monto,
            fecha: new Date(fecha),
            tipo: tipo as "INGRESO" | "EGRESO" | "AHORRO" | "DESCUENTO",
            categoriaId: idCategoria ?? undefined
        };
        console.log("Nuevo movimiento a crear *FormularioMovimientos.tsx*: ", nuevoMovimiento);
        const error = await validarMovimiento(nuevoMovimiento);

        if (typeof error === "string") {
            setError(error);
            return;
        };

        setError("");
        onCrearMovimiento({
            descripcion: nuevoMovimiento.descripcion,
            monto: nuevoMovimiento.monto,
            fecha: nuevoMovimiento.fecha as Date,
            tipo: nuevoMovimiento.tipo,
            categoriaId: nuevoMovimiento.categoriaId
        });
        setDescripcion("");
        setMonto(0);
        setFecha(new Date().toISOString().substring(0, 10));
        setTipo("");
        setIdCategoria(null);
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "1rem", color: "#333" }}>
            <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "0.5rem", color: "#555", textAlign: "left" }}>
                    Descripción:
                </label>
                <input
                    type="text"
                    placeholder="Ingrese una descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    style={inputEstilo}
                />
            </div>

            <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "0.5rem", color: "#555", textAlign: "left" }}>
                    Monto:
                </label>
                <input
                    type="number"
                    step="0.01"
                    value={isNaN(monto) ? "" : monto}
                    onChange={(e) => setMonto(parseFloat(e.target.value))}
                    style={inputEstilo}
                />
            </div>

            <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "0.5rem", color: "#555", textAlign: "left" }}>
                    Fecha:
                </label>
                <input
                    type="date"
                    value={fecha ?? ""}
                    onChange={(e) => setFecha(e.target.value)}
                    style={inputEstilo}
                />
            </div>

            <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "0.5rem", color: "#555", textAlign: "left" }}>
                    Tipo:
                </label>
                <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as TipoMovimiento)}
                    style={inputEstilo}
                >
                    <option value="">-- Seleccionar tipo --</option>
                    <option value="INGRESO">Ingreso</option>
                    <option value="EGRESO">Egreso</option>
                    <option value="AHORRO">Ahorro</option>
                    <option value="DESCUENTO">Descuento</option>
                </select>
            </div>

            <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "column" }}>
                <label style={{ marginBottom: "0.5rem", color: "#555", textAlign: "left" }}>
                    Categoría:
                </label>
                <select
                    value={idCategoria ?? ""}
                    onChange={(e) => {
                        const val = e.target.value;
                        setIdCategoria(val ? Number(val) : null);
                    }}
                    style={inputEstilo}
                >
                    <option value="">-- Seleccionar categoría --</option>
                    {categorias.map((cat) => (
                        <option key={cat.nro} value={cat.nro}>
                            {cat.nombre}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

            <button type="submit" style={botonEstilo}>
                Crear movimiento
            </button>
        </form>
    );
}
const inputEstilo: React.CSSProperties = {
    width: "100%",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    color: "#333"
};

const botonEstilo: React.CSSProperties = {
    padding: "0.5rem 1rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold"
};