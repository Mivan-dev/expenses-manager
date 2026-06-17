import { EntidadBase } from "./base.model";

export interface Servicio extends EntidadBase {
    empresa: string;
    monto: number;
    vencimiento: string;
}