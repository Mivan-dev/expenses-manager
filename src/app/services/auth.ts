import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { GastosService } from './gastos';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  httpClient = inject(HttpClient);
  router = inject(Router);
  gastosService = inject(GastosService);
  cargando = signal(false);
  errorLogin = signal<string | null>(null);

  baseUrl: string = environment.apiUrl;

  logIn(data: { email: string; password: string }) {
    this.cargando.set(true);
    this.errorLogin.set(null);

    this.httpClient.post<{ token: string }>(this.baseUrl + '/auth/login', data).subscribe({
      next: (respuesta) => {
        localStorage.setItem('token', respuesta.token);
        this.gastosService.loadData();
        this.cargando.set(false);
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => {
        this.cargando.set(false);
        if (err.status === 401) {
          this.errorLogin.set('Email o contraseña incorrectos');
        } else if (err.status === 0) {
          this.errorLogin.set(
            'No se pudo conectar con el servidor. Probá de nuevo en unos segundos.',
          );
        } else {
          this.errorLogin.set('Ocurrió un error inesperado. Probá de nuevo.');
        }
      },
    });
  }

  logOut() {
    localStorage.removeItem('token');
    this.gastosService.limpiarDatos();
    this.router.navigate(['login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
