import { useEffect, useState } from "react";
import type { TipoMovimiento } from "../../types/Movimiento.ts";
import type { Movimiento } from "../../types/Movimiento.ts";
import { getCategorias } from "../../api/categorias.ts";
import type { Categoria } from "../../types/Categoria.ts";

type Props = {
    visible: boolean;
    movimiento: Movimiento | null;
    onEditar: (movimientoEditado: Movimiento)=> void;
    onCancelar: () => void;
};

export function ModalEditarMovimiento({visible, movimiento, onEditar, onCancelar}: Props) {
    const [id, setId] = useState<number | null>(null);
    const [descripcion, setDescripcion] = useState("");
    const [monto, setMonto] = useState<number>(0);
    const [tipo, setTipo] = useState<TipoMovimiento>("INGRESO");
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loadingCats, setLoadingCats] = useState(true);
    const [categoriaId, setCategoriaId] = useState<number | undefined>(undefined);

    useEffect(() => {
        if(movimiento){
            setId(movimiento.id);
            setDescripcion(movimiento.descripcion);
            setMonto(movimiento.monto);
            const tipoNormalizado = movimiento.tipo.toUpperCase() as TipoMovimiento;
            setTipo(tipoNormalizado);
            const idCategoria = movimiento.categoriaId ?? movimiento.categoria?.nro;
            if (typeof idCategoria === "number" && !isNaN(idCategoria)) {
                setCategoriaId(idCategoria);
            } else {
                console.warn("Categoría inválida en movimiento:", movimiento);
                setCategoriaId(undefined);
            };
        }else {
            console.warn("Movimiento inválido para edición:", movimiento)
        };
    }, [movimiento]);

    useEffect(() => {
        if (visible) {
            getCategorias().then(({ datos, error }) => {
                if (!error && datos) {
                    setCategorias(datos);
                } else {
                    console.error("Error al cargar categorías:", error);
                }
                setLoadingCats(false);
            });
        }
    }, [visible]);

    if(!visible || !movimiento) return null;

    const handleEditar = () => {
        if (typeof id !== "number" || isNaN(id)) {
            alert("ID de movimiento inválido.");
            return;
        };
        if (!categoriaId) {
            console.warn("No se seleccionó categoría válida:", { id, categoriaId });
            alert("Seleccioná una categoría válida.");
            return;
        };

        const movimientoEditado: Movimiento = {
            ...movimiento,
            id,
            descripcion: descripcion.trim(),
            monto,
            tipo,
            categoriaId
        };
        onEditar(movimientoEditado);
    };
    
    return (
    <div
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
        }}
    >
        <div
            style={{
                background: "#fff",
                padding: "2rem",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                width: "100%",
                maxWidth: "400px",
                boxSizing: "border-box",
                fontFamily: "sans-serif"
            }}
        >
            <h3 style={{ marginBottom: "1.5rem", textAlign: "center", color: "#333" }}>
                Editar movimiento
            </h3>

            <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#555" }}>
                    Descripción:
                </label>
                <input
                    type="text"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "0.5rem",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        backgroundColor: "#474747ff"
                    }}
                />
            </div>

            <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#555" }}>
                    Monto:
                </label>
                <input
                    type="number"
                    value={monto}
                    onChange={(e) => setMonto(parseFloat(e.target.value))}
                    style={{
                        width: "100%",
                        padding: "0.5rem",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        backgroundColor: "#474747ff"
                    }}
                />
            </div>

            <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#555" }}>
                    Tipo:
                </label>
                <select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as TipoMovimiento)}
                    style={{
                        width: "100%",
                        padding: "0.5rem",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        backgroundColor: "#474747ff"
                    }}
                >
                    <option value="INGRESO">Ingreso</option>
                    <option value="EGRESO">Egreso</option>
                    <option value="AHORRO">Ahorro</option>
                    <option value="DESCUENTO">Descuento</option>
                </select>
            </div>

            <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", color: "#555" }}>
                    Categoría:
                </label>
                {loadingCats ? (
                    <span style={{ color: "#888" }}>Cargando categorías...</span>
                ) : (
                    <select
                        value={categoriaId ?? ""}
                        onChange={(e) => setCategoriaId(parseInt(e.target.value))}
                        style={{
                            width: "100%",
                            padding: "0.5rem",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            backgroundColor: "#474747ff"
                        }}
                    >
                        <option value="">Seleccionar categoría</option>
                        {categorias.map((cat) => (
                            <option key={cat.nro} value={cat.nro}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem" }}>
                <button
                    onClick={onCancelar}
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#de6713ff",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Cerrar
                </button>
                <button
                    onClick={handleEditar}
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#229626ff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                >
                    Guardar
                </button>
            </div>
        </div>
    </div>
);

}