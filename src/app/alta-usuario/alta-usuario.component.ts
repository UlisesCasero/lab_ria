import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.scss']
})
export class AltaUsuarioComponent {
  usuario: any = [];
  tiposDocumentos: any[] = [];
  public error: String = '';

  constructor(private http: HttpClient, private router: Router,  private location: Location) { }

  ngOnInit() {
    this.obtenerTipoDocumentos();
  }

  obtenerTipoDocumentos() {
    const url = `http://localhost:5000/api/TiposDeDocumentos/Paged`;
    const Body = {
      limit: -1,
      offset: 0,
      id: 0,
      filters: {
        activo: true,
        nombre: ''
      },
      orders: ['']
    };

    this.http.post<any>(url, Body).subscribe(
      (response) => {
        console.log('Entro');
        this.tiposDocumentos = response.list;
      },
      (error) => {
        console.log('Error al obtener los documents');
      }
    );
  }

  registrarUsuario(form: NgForm) {
    console.log(
      form.value.tipoDocumentoId,
      form.value.documento,
      form.value.primerNombre,
      form.value.segundoNombre,
      form.value.primerApellido,
      form.value.segundoApellido,
      form.value.email,
    );
    if (form.valid) {
      const requestBody = {
        id: "",
        tipoDocumentoId: form.value.tipoDocumentoId,
        documento: form.value.documento,
        primerNombre: form.value.primerNombre,
        segundoNombre: form.value.segundoNombre,
        primerApellido: form.value.primerApellido,
        segundoApellido: form.value.segundoApellido,
        email: form.value.email,
        imagen: "",
        activo: true
      };
      const url = `http://localhost:5000/api/Auth/Register`;
      this.http.post<any>(url, requestBody).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'El Usuario se creó correctamente',
            timer: 2000,
            timerProgressBar: true
          });
           this.location.back();
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error,
            timer: 2000,
            timerProgressBar: true
          });
        }
      )
    }
  }
  cancelar() {
    this.router.navigate(['/listar-usuarios']);
  }

}
