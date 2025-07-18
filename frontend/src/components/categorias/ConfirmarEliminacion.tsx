type Props = {
    visible: boolean;
    nombre: string;
    onConfirmar: ()=> void;
    onCancelar: ()=> void;
};

export function ConfirmarEliminacion({ visible, nombre, onConfirmar, onCancelar }: Props) {
    if (!visible) return null;
    return (
        <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
            }}>
            <div style={{ background: "#fff", color:"#333", padding: "2rem", borderRadius: "8px", maxWidth: "400px" }}>
                <h3>¿Eliminar categoría?</h3>
                <p>La categoría <strong>{nombre}</strong> será eliminada.</p>
                <div style={{ marginTop: "1rem" }}>
                    <button onClick={onConfirmar} style={{ color: "red", marginRight: "1rem" }}>Eliminar</button>
                    <button onClick={onCancelar}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}