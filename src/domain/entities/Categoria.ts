import { Entity, PrimaryKey, Property, OneToMany, Collection } from "@mikro-orm/core";
import { Movimiento } from "./Movimiento.ts";

@Entity()
export class Categoria {
    @PrimaryKey()
    nro!: number;

    @Property()
    nombre!: string;

    @Property()
    color?: string;

    @OneToMany(() => Movimiento, movimiento => movimiento.categoria)
    movimiento = new Collection<Movimiento>(this);
};