import { EntidadBase } from './base.model';

export interface Servicio extends EntidadBase {
  empresaId: string;
  monto: number;
  vencimiento: string;
  etiqueta1?: EtiquetaCredencial | null;
  valor1?: string | null;
  etiqueta2?: EtiquetaCredencial | null;
  valor2?: string | null;
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
