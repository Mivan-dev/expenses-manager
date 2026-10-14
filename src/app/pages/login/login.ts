import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Logo } from '../../components/layout/logo/logo';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Logo],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authLogin = inject(Auth);
  fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  campoInvalido(nombre: 'email' | 'password') {
    const control = this.form.controls[nombre];
    return control.invalid && (control.touched || control.dirty);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.authLogin.logIn({
      email: this.form.value.email!,
      password: this.form.value.password!,
    });
  }
}