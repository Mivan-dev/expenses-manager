import { EntidadBase } from "./base.model";

export interface Cuota extends EntidadBase {
    cuotaActual: number;
    cuotaBase: number;
    cuotaTotal: number;
    monto: number;
    fechaCarga: string;
}