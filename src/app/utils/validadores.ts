import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// El monto llega como texto desde el input: debe ser un número mayor a 0.
export const montoPositivo: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const valor = String(control.value ?? '').trim();
  if (valor === '') return null; // de "obligatorio" se encarga Validators.required
  const numero = Number(valor);
  return Number.isFinite(numero) && numero > 0 ? null : { montoInvalido: true };
};

// Entero mayor o igual a 1 (cuotas).
export const enteroPositivo: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const valor = String(control.value ?? '').trim();
  if (valor === '') return null;
  const numero = Number(valor);
  return Number.isInteger(numero) && numero >= 1 ? null : { enteroInvalido: true };
};

// Regla entre campos: cuotaActual no puede superar cuotaTotal.
export const cuotaActualMenorOIgual: ValidatorFn = (
  grupo: AbstractControl,
): ValidationErrors | null => {
  const actual = Number(grupo.get('cuotaActual')?.value);
  const total = Number(grupo.get('cuotaTotal')?.value);
  if (!Number.isFinite(actual) || !Number.isFinite(total)) return null;
  return actual <= total ? null : { cuotaMayorQueTotal: true };
};