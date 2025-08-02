interface TipoTagProps {
    tipo: string;
};

const colores: Record<string, string> = {
    EGRESO: "#e74c3c",      // rojo
    INGRESO: "#27ae60",     // verde
    AHORRO: "#2980b9",      // azul
    DESCUENTO: "#7f8c8d",   // gris
};

export const TipoTag: React.FC<TipoTagProps> = ({ tipo }) => {
    const tipoNormalizado = tipo.toUpperCase();
    const color = colores[tipoNormalizado] || "#bdc3c7"; // gris claro default

    return(
        <span style= {{
            padding: "4px 8px",
            borderRadius: "4px",
            fontWeight: "bold",
            fontSize: "0.85rem",
            color: "#fff",
            backgroundColor: color,
        }}>
            {tipoNormalizado}
        </span>
    );
};