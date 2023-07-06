import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location, private router: Router) { }

  altaAreas(nombre: string) {
   
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
    this.router.navigate(['/listar-areas']);
  }
  
}
