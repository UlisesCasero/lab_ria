import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string = '';
  username: string = "";
  password: string = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
  }

  login(username: string, password: string){
    const requestBody = {
      username: username,
      password: password
    };
    const url = `http://localhost:5000/api/Auth/Login`;

    this.http.post<any>(url, requestBody)
    .subscribe(
      response => {
        // Verificar si el login fue exitoso
        if (response.statusOk) {
          // Obtener el token de autenticación
          const token = response.token;

          

          // Guardar el token en sessionStorage
          sessionStorage.setItem('token', token);

          console.log(token);

          // Redireccionar al usuario a otra página (por ejemplo, el panel de control)
          // Aquí puedes usar el enrutamiento de Angular para navegar a otra ruta
        } else {
          // Mostrar un mensaje de error al usuario
          const errorMessage = response.statusMessage;
          // Por ejemplo, puedes utilizar una variable en el componente para mostrar el mensaje en el template
          this.errorMessage = errorMessage;
        }
      },
      error => {
        // Mostrar un mensaje de error genérico al usuario
        this.errorMessage = 'Ocurrió un error al realizar el inicio de sesión. Por favor, intenta nuevamente.';
      }
    );  
  }
}
