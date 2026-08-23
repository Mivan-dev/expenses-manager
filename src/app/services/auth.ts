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
    this.httpClient.post<string>(this.baseUrl + '/auth/login', data).subscribe({
      next: (respuesta) => {
        localStorage.setItem('token', respuesta);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('error de credenciales');
      },
    });
  }

  logOut() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
