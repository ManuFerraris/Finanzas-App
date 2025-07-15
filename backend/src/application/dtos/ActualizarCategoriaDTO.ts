export interface ActualizarCategoriaDTO {
    nombre: string;
    color: string;
};

export function validarActualizacionCategoria(dto: ActualizarCategoriaDTO): string[] {
    const errores: string[] = [];
    
    if (!dto.nombre || dto.nombre.trim().length === 0) {
        errores.push("El nombre de la categoría es obligatorio.");
    };

    if (!dto.color || dto.color.trim().length === 0) {
        errores.push("El color de la categoría es obligatorio.");
    } else if (!/^#[0-9A-Fa-f]{6}$/.test(dto.color)) {
        errores.push("El color debe ser un código hexadecimal válido.");
    };

    return errores;
};