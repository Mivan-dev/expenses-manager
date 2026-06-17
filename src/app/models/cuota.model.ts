import { EntidadBase } from "./base.model";

export interface Cuota extends EntidadBase {
    cuotaActual: number;
    cuotaTotal: number;
    monto: number;
}