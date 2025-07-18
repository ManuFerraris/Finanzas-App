import { useEffect, useState } from "react";
type Categoria = {
  nro: number;
  nombre: string;
  color: string;
};

type Props = {
  visible: boolean;
  categoria: Categoria | null;
  onEditar: (nro: number, nombre: string, color: string) => void;
  onCancelar: () => void;
};

export function ModalEditarCategoria({visible, categoria, onEditar, onCancelar}: Props) {
  const [nro, setNro] = useState<number | null>(null);
  const [nombre, setNombre] = useState("");
  const [color, setColor] = useState("");

  useEffect(()=> {
    if(visible && categoria && typeof categoria.nro === "number") {
      setNro(categoria.nro);
      setNombre(categoria.nombre);
      setColor(categoria.color.startsWith("#") ? categoria.color : `#${categoria.color}`);
    } else {
      console.warn("Categoría inválida para edición:", categoria);
    };
  }, [visible, categoria]);

  if(!visible || !categoria) return null;

  const handleEditar = () => {
    if(typeof nro !== "number" || isNaN(nro)) {
      alert("Número de categoría inválido.");
      return;
    }
    onEditar(nro, nombre.trim(), color);
  }

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div style={{
        background: "#fff", color: "#333", padding: "2rem", borderRadius: "8px", maxWidth: "400px"
      }}>
        <h3>Editar categoría</h3>
        <div>
          <label>
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </label>
        </div>
        <div style={{ marginTop: "0.5rem" }}>
          <label>
            Color:
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <button onClick={onCancelar}>
            Cerrar
          </button>
          <button onClick={handleEditar}>Guardar</button>
        </div>
      </div>
    </div>
  );
}