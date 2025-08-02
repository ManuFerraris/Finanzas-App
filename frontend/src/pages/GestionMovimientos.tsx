import { useState, useEffect } from "react";
import { CenteredLayout } from "../utils/CenteredLayout.tsx";
import { FormularioMovimiento } from "../components/mivimientos/FormularioMovimientos.tsx";
import type { Categoria } from "../types/Categoria.ts";
import type { Movimiento } from "../types/Movimiento.ts";
import { getCategorias } from "../api/categorias.ts";
import { getMovimientos,
    crearMovimiento as crearMovimientoAPI,
    eliminarMovimiento as eliminarMovimientoAPI,
    editarMovimiento as editarMovimientoAPI
} from "../api/movimientos.ts";
import { ModalEditarMovimiento } from "../components/mivimientos/ModalEditarMovimiento.tsx";
import { TablaMovimientos } from "../components/mivimientos/TablaMovimientos.tsx";
import { ConfirmarEliminacionMovimiento } from "../components/mivimientos/ConfirmarEliminacionMovimiento.tsx";

export function GestionMovimientos() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
    const [movimientoAEditar, setMovimientoAEditar] = useState<Movimiento | null>(null);
    const [movimientoAEliminar, setMovimientoAEliminar] = useState<Movimiento | null>(null);
    const [modalEditarVisible, setModalEditarVisible] = useState(false);
    const [modalEliminarVisible, setModalEliminarVisible] = useState(false);


    useEffect(() => {
        getCategorias().then(({ datos, error }) => {
            if (!error && datos) {
                setCategorias(datos);
            } else {
                console.error("Error al cargar categorías:", error);
            };
        });
    }, []);

    useEffect(( ) => {
        getMovimientos().then(({ datos, error }) => {
            if (!error && datos) {
                setMovimientos(datos);
            } else {
                console.error("Error al cargar movimientos:", error);
            };
        })
    }, []);

    const crearMovimiento = async (nuevo: {
        descripcion: string;
        monto: number;
        fecha: Date;
        tipo: string;
        categoriaId?: number;
    }) => {
        crearMovimientoAPI(nuevo).then(({ datos, error }) => {
            if (!error && datos && typeof datos.id === "number") {
                setMovimientos((prev) => [...prev, datos]);
            } else {
                console.error("Error en creación o datos incompletos:", error, datos);
                alert(error ?? "Hubo un problema al crear la categoría.");
            }
        });
    };

    const ConfirmarEliminacion = (movimiento: Movimiento) => {
        setMovimientoAEliminar(movimiento);
        setModalEliminarVisible(true);
    }

    const editarMovimiento = (mov:Movimiento) => {
        const encontrado = movimientos.find((m)=> m.id === mov.id);
        
        if (!encontrado) {
            console.warn("No se encontró la categoría con nro:", mov.id);
            return;
        };

        console.log("Movimiento que se va a editar: ", encontrado);

        setMovimientoAEditar(encontrado);
        setModalEditarVisible(true);
    };

    const guardarEdicion = (movimientoEditado: Movimiento) => {
        const {id, ...datos} = movimientoEditado;

        editarMovimientoAPI( id, datos ).then(({ datos: respuesta, error })=> {
            if (error || !respuesta) {
                alert(error);
                return;
            };
            if(!error || respuesta){
                console.log("Respuesta del backend al editar:", respuesta);
                const movimientoActualizado: Movimiento = {
                    ...respuesta,
                    id
                };

                setMovimientos((prev)=> prev.map((m)=> (m.id === id ? movimientoActualizado : m ))
                );
                setModalEditarVisible(false);
                setMovimientoAEditar(null);
            } else {
                alert(error);
            };
        });
    };

    const eliminarMovimiento = () => {
        if(!movimientoAEliminar) return;

        eliminarMovimientoAPI(movimientoAEliminar.id).then(({ ok, error}) => {
            if (ok) {
                setMovimientos((prev) => prev.filter((m) => m.id !== movimientoAEliminar.id));
                setModalEliminarVisible(false);
                setMovimientoAEliminar(null);
            } else {
                alert(error);
            }
        });
    };

    const cancelarEliminacion = () => {
        setModalEliminarVisible(false);
        setMovimientoAEliminar(null);
    };

    return (
        <CenteredLayout>
            <div style={{ padding: "1rem", color:'#555' }}>
                <h2>Gestión de Movimientos</h2>

                <FormularioMovimiento 
                    onCrearMovimiento={crearMovimiento}
                    categorias={categorias}
                />
                <TablaMovimientos
                    categorias = {categorias}
                    movimientos= {movimientos}
                    onEliminar = {ConfirmarEliminacion}
                    onEditar = {editarMovimiento}
                />

                <ConfirmarEliminacionMovimiento
                    visible={modalEliminarVisible}
                    movimiento={movimientoAEliminar}
                    onConfirmar={eliminarMovimiento}
                    onCancelar={cancelarEliminacion}
                />

                <ModalEditarMovimiento
                    visible={modalEditarVisible}
                    movimiento={movimientoAEditar}
                    onEditar={guardarEdicion}
                    onCancelar={() => {
                        setModalEditarVisible(false);
                        setMovimientoAEditar(null);
                    }}
                />
            </div>
        </CenteredLayout>
    );
};