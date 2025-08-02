import type { Categoria } from "../../types/Categoria.ts"
export const CategoriaTag = ({ categoria }: {categoria?: Categoria}) => {
    return(
        <span style = {{
        backgroundColor: categoria?.color ?? "#ccc",
        padding: "0.2rem 0.5rem",
        borderRadius: "5px",
        color: "#000",
        fontWeight: "bold",
        fontSize: "0.85rem"
    }}>
        {categoria?.nombre ?? "Sin Categoria"}
    </span>
    )
};