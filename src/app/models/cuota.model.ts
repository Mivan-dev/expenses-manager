import { EntidadBase } from "./base.model";

export interface Cuota extends EntidadBase {
    cuotaActual: number;
    cuotaTotal: number;
    cuotaBase: number;
    monto: number;
    fechaCarga: string;
}