import type { FC } from "react";
import type { Movimiento } from "../../types/Movimiento.ts";

type Props = {
    visible: boolean;
    movimiento: Movimiento | null;
    onConfirmar: ()=> void;
    onCancelar: ()=> void;
};

export const ConfirmarEliminacionMovimiento: FC<Props> = ({
    visible,
    movimiento,
    onConfirmar,
    onCancelar,
    }) => {
    if (!visible) return null;

    return (
        <div className="modal">
            <h3>¿Eliminar el movimiento?</h3>
                <p>
                    <strong> {movimiento?.descripcion?? "Sin descripcion"}</strong> será eliminado permanentemente.
                </p>
                <button onClick={onConfirmar}>Sí, eliminar</button>
                <button onClick={onCancelar}>Cancelar</button>
        </div>
    );
};