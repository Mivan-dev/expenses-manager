import { EntidadBase } from "./base.model";

export interface Servicio extends EntidadBase {
    empresaId: string;
    monto: number;
    vencimiento: string;
    etiqueta1?: EtiquetaCredencial;
    valor1?: string;
    etiqueta2?: EtiquetaCredencial;
    valor2?: string
}

export enum EtiquetaCredencial {
    NUMERO_CLIENTE = 'NUMERO_CLIENTE',
    NUMERO_CONTRATO = 'NUMERO_CONTRATO',
    NUMERO_CUENTA = 'NUMERO_CUENTA',
    UF = 'UF',
    NUMERO = 'NUMERO',
    IDENTIFICADOR = 'IDENTIFICADOR',
}

export enum EtiquetaLabels {
    NUMERO_CLIENTE = 'N° Cliente',
    NUMERO_CONTRATO = 'N° Contrato',
    NUMERO_CUENTA = 'N° Cuenta',
    UF = 'UF',
    NUMERO = 'Número',
    IDENTIFICADOR = 'Identificador',
}