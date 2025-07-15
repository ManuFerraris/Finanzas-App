import { describe, it, expect, vi } from "vitest";
import { RegistrarMovimiento } from "./RegistrarMovimiento.ts";
import { MovimientoRepository } from "../../interfaces/MovimientoRepository.ts";
import { RegistrarMovimientoDTO } from "../../dtos/RegistrarMovimientoDTO.ts";
import { TipoMovimiento } from "../../../domain/enums/TipoMovimiento.ts";

const dtoValido: RegistrarMovimientoDTO = {
    descripcion: "Cafe",
    monto: 3500,
    fecha: "2023-10-01",
    tipo: TipoMovimiento.EGRESO,
};

describe("RegistrarMovimiento", () => {
    it("deberia registrar correctamente un movimiento valido", async()=> {
        const repoMock: MovimientoRepository = {
            guardar: vi.fn().mockResolvedValue(undefined),
        };

        const caso = new RegistrarMovimiento(repoMock);
        const errores = await caso.ejecutar(dtoValido);

        expect(errores).toEqual([]);
        expect(repoMock.guardar).toHaveBeenCalledTimes(1);
    })

    it("deberia retornar errores si el dto es invalido", async()=> {
        const repoMock: MovimientoRepository = {
            guardar: vi.fn(),
        };

        const caso = new RegistrarMovimiento(repoMock);
        const dtoInvalido: RegistrarMovimientoDTO = {
            descripcion: "",
            monto: -100,
            fecha: "fecha-invalida",
            tipo: "tipo-invalido" as TipoMovimiento, // tipo invalido
        };
        const errores = await caso.ejecutar(dtoInvalido);

        expect(errores).toEqual([
            "La descripción es obligatoria.",
            "El monto debe ser un número positivo.",
            "La fecha debe ser una fecha válida.",
            "El tipo de movimiento es inválido."
        ]);
        expect(repoMock.guardar).not.toHaveBeenCalled();
    });
});