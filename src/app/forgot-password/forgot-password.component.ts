import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  successMessage: string | undefined;
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
  errorMessage: string = '';
  email: string | undefined;

  forgotPassword(form: NgForm) {
    const email = form.value.email;
    const requestBody = {
      email: email
    };
    const url = `http://localhost:5000/api/Auth/ForgotPassword`;
    this.http.post<any>(url, requestBody)
      .subscribe(
        response => {
          if (response.status) {
            this.successMessage = response.mensaje;
          } else {
            const errorMessage = response.mensaje;
            this.errorMessage = errorMessage;
          }
        },
        error => {
          this.errorMessage = 'Ocurrió un error al restablecer la contraseña. Por favor, intenta nuevamente.';
        }
      );
  }
}
