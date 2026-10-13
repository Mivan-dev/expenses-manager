import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment'
import { GastosService } from './gastos';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  httpClient = inject(HttpClient);
  router = inject(Router);
  gastosService = inject(GastosService);

  baseUrl: string = environment.apiUrl;

  logIn(data: { email: string; password: string }) {
    this.httpClient.post<{token: string}>(this.baseUrl + '/auth/login', data).subscribe({
      next: (respuesta) => {
        localStorage.setItem('token', respuesta.token);
        this.gastosService.loadData();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('error de credenciales');
      },
    });
  }

  logOut() {
    localStorage.removeItem('token');
    this.gastosService.limpiarDatos();
    this.router.navigate(['login'])
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
