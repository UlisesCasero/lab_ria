import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string = '';
  username: string = '';
  password: string = '';
  public logueado: boolean = false;
  public user: any;
  public documento: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {

  }

  login(username: string, password: string) {
    const requestBody = {
      username: username,
      password: password
    };
    const url = `http://localhost:5000/api/Auth/Login`;

    this.http.post<any>(url, requestBody).subscribe(
      response => {
       // let numero: response.persona.id;
        //let cadena: string = numero.toString();
       // console.log(cadena); // "42"
        if (response.statusOk) {
          const token = response.token;
          const user: User = {
            id: response.idUsuario,
            nombre: response.nombre,
            email: response.email,
            roles: response.roles,
            documento: response.documento,
            tipoDeDocumento: response.tipoDocumento.id
          };

          sessionStorage.setItem('token', token);
          sessionStorage.setItem('email', user.email);
          sessionStorage.setItem('id', user.id);
          sessionStorage.setItem('nombre', user.nombre);
          sessionStorage.setItem('roles', JSON.stringify(user.roles));
          console.log('rolesssguardadossss', user.roles);
          sessionStorage.setItem('documento', user.documento);
         sessionStorage.setItem('tipoDocumento', user.tipoDeDocumento);
         console.log('Usuario en sesiónnnnnnnn:', user.documento);
         console.log('Usuario en tipo:', user.tipoDeDocumento);
          this.logueado = true;
          console.log(token);
          this.router.navigate(['/']);
        } else {
          const errorMessage = response.statusMessage;
          this.errorMessage = errorMessage;
        }
      },
      error => {
        this.errorMessage = 'Ocurrió un error al realizar el inicio de sesión. Por favor, intenta nuevamente.';
      
      }
    );
  }

  forgotPassword() {
    this.router.navigate(['login/forgot-password']);
  }
}
