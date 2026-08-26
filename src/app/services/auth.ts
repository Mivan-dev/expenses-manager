import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  httpClient = inject(HttpClient);
  router = inject(Router);

  baseUrl: string = 'http://localhost:3000';

  logIn(data: { email: string; password: string }) {
    this.httpClient.post<{token: string}>(this.baseUrl + '/auth/login', data).subscribe({
      next: (respuesta) => {
        localStorage.setItem('token', respuesta.token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('error de credenciales');
      },
    });
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['login'])
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
