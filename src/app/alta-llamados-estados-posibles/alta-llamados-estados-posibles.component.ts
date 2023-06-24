import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-alta-llamados-estados-posibles',
  templateUrl: './alta-llamados-estados-posibles.component.html',
  styleUrls: ['./alta-llamados-estados-posibles.component.scss']
})
export class AltaLlamadosEstadosPosiblesComponent {
  public id: number = 0;
public nombre: string = '';
  public activo: boolean = true;
  public error: String = '';

  constructor(private http: HttpClient, private location: Location) { }

  altaLlamadosEstadosPosibles(nombre: string) {
  

    if (!nombre) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre del llamado no puede estar vacío',
        timer: 2000,
        timerProgressBar: true
      });
      return; 
    }
  
    const url = `http://localhost:5000/api/LlamadosEstadosPosibles`;
    const nom = { nombre: nombre, activo: true };
    this.http.post<any>(url, nom).subscribe(
      (response) => {
        console.log('LlamadosEstadosPosibles creado:', response);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El llamado se guardó correctamente',
          timer: 2000,
          timerProgressBar: true
        });
      },
      (error) => {
        console.log('Error al crear el LlamadoEstadosPosibles:', error);
        this.error = 'Error al crear el LlamadoEstadosPosibles';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al crear el LlamadoEstadosPosibles',
          timer: 2000,
          timerProgressBar: true
        });
      }
    );
  }

  cancelar() {
    this.location.back();
  }
  
}
