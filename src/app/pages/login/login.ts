import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authLogin = inject(Auth);
  fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
  });

  onSubmit(){
    if(this.form.valid){
      const data = {
        email: this.form.value.email!,
        password: this.form.value.password!
      }
      this.authLogin.logIn(data)
    }
  }
}
