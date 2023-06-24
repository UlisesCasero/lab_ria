import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-alta-tipo-de-integrantes',
  templateUrl: './alta-tipo-de-integrantes.component.html',
  styleUrls: ['./alta-tipo-de-integrantes.component.scss']
})
export class AltaTipoDeIntegrantesComponent {
  public id: number = 0;
  public nombre: String ="";
  public activo: boolean = true;
  public error: String = '';

  constructor(private http: HttpClient, private location: Location) { }

  altaTipoDeIntegrantes(nombre: String){

      if (!nombre) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El nombre del tipo de integrante no puede estar vacío',
          timer: 2000,
          timerProgressBar: true
        });
        return;
      }
    const url = `http://localhost:5000/api/TiposDeIntegrantes`;
    const nom = { nombre: nombre , activo: true};
    this.http.post<any>(url, nom).subscribe(
      (response) => {
        console.log('tipo de Integrante creada:', response);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El tipo de integrante se guardó correctamente',
          timer: 2000,
          timerProgressBar: true
        });
      },
      (error) => {
        console.log('Error al crear el tipo de integrante:', error);
        this.error = 'Error al crear el tipo de integrante';
      }
    );
  }

  cancelar() {
    this.location.back();
  }
}
