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
        if (response.statusOk) {
          // El restablecimiento de contraseña se realizó correctamente
          // Aquí puedes redirigir al usuario a la página de confirmación o mostrar un mensaje de éxito
        } else {
          // Mostrar un mensaje de error al usuario
          const errorMessage = response.statusMessage;
          // Por ejemplo, puedes utilizar una variable en el componente para mostrar el mensaje en el template
          this.errorMessage = errorMessage;
        }
      },
      error => {
        // Mostrar un mensaje de error genérico al usuario
        this.errorMessage = 'Ocurrió un error al restablecer la contraseña. Por favor, intenta nuevamente.';
      }
    );  
  }
}
