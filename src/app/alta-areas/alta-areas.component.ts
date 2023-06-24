import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-alta-areas',
  templateUrl: './alta-areas.component.html',
  styleUrls: ['./alta-areas.component.scss']
})
export class AltaAreasComponent {
  public id: number = 0;
  public nombre: string = "";
  public activo: boolean = false;
  public error: string = '';

  constructor(private http: HttpClient, private location: Location) { }

  altaAreas(nombre: string) {
    if (!nombre) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre del área no puede estar vacío',
        timer: 2000,
        timerProgressBar: true
      });
      return; 
    }
  
    const url = `http://localhost:5000/api/Areas`;
    const area = {
      nombre: nombre,
      activo: true
    };
  
    this.http.post<any>(url, area).subscribe(
      (response) => {
        console.log('Área creada:', response);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El área se guardó correctamente',
          timer: 2000,
          timerProgressBar: true
        });
        this.location.back();
      },
      (error) => {
        console.log('Error al crear el área:', error);
        this.error = 'Error al crear el área';
      }
    );
  }

  cancelar() {
    this.location.back();
  }
  
  
}
