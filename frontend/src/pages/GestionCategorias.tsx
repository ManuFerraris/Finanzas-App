import { useState, useEffect } from "react";
import { FormularioCategoria } from "../components/categorias/FormularioCategoria";
import { TablaCategorias } from "../components/categorias/TablaCategorias";
import type { Categoria } from "../types/Categoria.ts";
import { ConfirmarEliminacion } from "../components/categorias/ConfirmarEliminacion.tsx";
import {
  getCategorias,
  crearCategoria as crearCategoriaAPI,
  eliminarCategoria as eliminarCategoriaAPI,
  editarCategoria as editarCategoriaAPI
} from "../api/categorias.ts";
import { ModalEditarCategoria } from "../components/categorias/ModalEditarCategoria.tsx";

export function GestionCategorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState<Categoria | null>(null);
  const [categoriaAEditar, setCategoriaAEditar] = useState<Categoria | null>(null);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);

  useEffect(() => {
    getCategorias().then(({ datos, error }) => {
      if (!error) setCategorias(datos);
      else console.error(error);
    });
  }, []);

  const crearCategoria = (nueva: { nombre: string; color: string }) => {
    crearCategoriaAPI(nueva).then(({ datos, error }) => {
      if (!error && datos && typeof datos.nro === "number") {
        setCategorias((prev) => [...prev, datos]);
      }
      else {
        console.error("Error en creación o datos incompletos:", error, datos);
        alert(error ?? "Hubo un problema al crear la categoría.");
      }
    });
  };

  const confirmarEliminacion = (categoria: Categoria) => {
    setCategoriaAEliminar(categoria);
    setModalEliminarVisible(true);
  };

  const eliminarCategoria = () => {
    if (!categoriaAEliminar) return;

    eliminarCategoriaAPI(categoriaAEliminar.nro).then(({ ok, error }) => {
      if (ok) {
        setCategorias((prev) => prev.filter((c) => c.nro !== categoriaAEliminar.nro));
        setModalEliminarVisible(false);
        setCategoriaAEliminar(null);
      } else {
        alert(error);
      }
    });
  };

  const cancelarEliminacion = () => {
    setModalEliminarVisible(false);
    setCategoriaAEliminar(null);
  };

  const editarCategoria = (cat: Categoria) => {
    const encontrada = categorias.find((c) => c.nro === cat.nro);

    if (!encontrada) {
      console.warn("No se encontró la categoría con nro:", cat.nro);
      return;
    }
    const categoriaValida: Categoria = {
      nro: encontrada.nro,
      nombre: encontrada.nombre,
      color: encontrada.color,
    };

    setCategoriaAEditar(categoriaValida);
    setModalEditarVisible(true);
  };

  const guardarEdicion = (nro: number, nombre: string, color: string) => {
    editarCategoriaAPI(nro, { nombre, color }).then(({ datos, error }) => {
      if(!error && datos){
        setCategorias((prev)=>
        prev.map((c) => (c.nro === nro ? datos:c))
      );
      setModalEditarVisible(false);
      setCategoriaAEditar(null);
      }else { 
        alert(error); 
      }
    });
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Gestión de Categorías</h2>
      <FormularioCategoria onCrearCategoria={crearCategoria} />
      <TablaCategorias
        categorias={categorias}
        onEliminar={confirmarEliminacion}
        onEditar={editarCategoria}
      />
      <ConfirmarEliminacion
        visible={modalEliminarVisible}
        nombre={categoriaAEliminar?.nombre ?? ""}
        onConfirmar={eliminarCategoria}
        onCancelar={cancelarEliminacion}
      />
      <ModalEditarCategoria
        visible={modalEditarVisible}
        categoria={categoriaAEditar}
        onEditar={guardarEdicion}
        onCancelar={()=> setModalEditarVisible(false)} 
      />
    </div>
  );
}
