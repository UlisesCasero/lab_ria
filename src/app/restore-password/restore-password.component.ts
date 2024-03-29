import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {
  token: string | undefined; // Propiedad para almacenar el token de confirmación
  email: string | undefined; // Propiedad para almacenar el correo electrónico
  newPassword: string | undefined; // Propiedad para almacenar la nueva contraseña
  confirmPassword: string | undefined; // Propiedad para almacenar la confirmación de contraseña

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
    });
  }

  restorePassword(): void {
    if (!this.token || !this.email || !this.newPassword || !this.confirmPassword) {
      console.log('Missing token, email, password, or confirmPassword');
      return;
    }
    console.log('Email:', this.email);
    console.log('New Password:', this.newPassword);
    console.log('Confirm Password:', this.confirmPassword);
    console.log('Token:', this.token);
    const payload = {
      password: this.newPassword,
      confirmPassword: this.confirmPassword,
      email: this.email,
      token: this.token
    };
    const url = `http://localhost:5000/api/Auth/ResetPassword`;
    this.http.post<any>(url, payload).subscribe(
      () => {
        console.log('Password restored successfully');
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Se le envio un correo electronico',
          timer: 2000,
          timerProgressBar: true
        });
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Failed to restore password', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text:error,
          timer: 2000,
          timerProgressBar: true
        });
      
      }
    );
  }
}

