import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-alta-tipo-de-integrante',
  templateUrl: './alta-tipo-de-integrante.component.html',
  styleUrls: ['./alta-tipo-de-integrante.component.scss']
})
export class AltaTipoDeIntegranteComponent {
  public tipoIntegrante: any = {};
  public error: String = '';

  constructor(private http: HttpClient, private location: Location) { }

  altaTipoDeIntegrante(form: NgForm) {
    if(form.valid){
      if (!form.value.nombre) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El nombre del tipo de integrante no puede estar vacío',
          timer: 2000,
          timerProgressBar: true
        });
        return; 
      }
      if (form.value.orden > 3 || form.value.orden <= 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El orden no debe ser mayor que 3 ni menor que 1',
          timer: 2000,
          timerProgressBar: true
        });
        return; 
      }
      console.log("El nombre es: " + form.value.nombre);
      console.log("El orden es: " + form.value.orden);
      
      const url = `http://localhost:5000/api/TiposDeIntegrantes`;
      const requestBody = { 
        nombre: form.value.nombre, 
        activo: true,
        orden: form.value.orden
      };
      this.http.post<any>(url, requestBody).subscribe(
        (response) => {
          console.log('TipoDeIntegrante creado:', response);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'El tipo de integrante se creo correctamente',
            timer: 2000,
            timerProgressBar: true
          });
        },
        (error) => {
          console.log('Error al crear el TipoDeIntegrante:', error);
          this.error = 'Error al crear el TipoDeIntegrante';
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al crear el TipoDeIntegrante',
            timer: 2000,
            timerProgressBar: true
          });
        }
      );
    }
  }

  cancelar() {
    this.location.back();
  }
}
