import { PrimaryKey, 
    Property, 
    ManyToOne, 
    Entity, 
    Enum,
    Rel } from "@mikro-orm/core";
import { TipoMovimiento } from "../enums/TipoMovimiento.ts";
import { Categoria } from "./Categoria.ts";

@Entity()
export class Movimiento {
    @PrimaryKey()
    id!: number;

    @Property()
    descripcion!: string;

    @Property()
    monto!: number;

    @Property()
    fecha!: Date;

    @Enum(() => TipoMovimiento)
    tipo!: TipoMovimiento;

    @ManyToOne(() => Categoria, { nullable: true})
    categoria?: Rel<Categoria>;
};