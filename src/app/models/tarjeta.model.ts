import { EntidadBase } from "./base.model";
import { Cuota } from "./cuota.model";

export interface Tarjeta extends EntidadBase {
    empresa: string;
    monto: number;
    vencimiento: string;
    cuotas: Cuota[];
}