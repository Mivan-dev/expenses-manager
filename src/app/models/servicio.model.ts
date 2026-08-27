import { EntidadBase } from "./base.model";

export interface Servicio extends EntidadBase {
    empresaId: string;
    monto: number;
    vencimiento: string;
}