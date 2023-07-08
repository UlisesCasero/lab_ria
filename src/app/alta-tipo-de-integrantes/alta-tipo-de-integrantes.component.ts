import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-alta-tipo-de-integrantes',
  templateUrl: './alta-tipo-de-integrantes.component.html',
  styleUrls: ['./alta-tipo-de-integrantes.component.scss']
})
export class AltaTipoDeIntegrantesComponent {
  public id: number = 0;
  public nombre: string = "";
  public activo: boolean = true;
  public error: String = '';
  public selectedOption: string = '';
  
  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location, private router: Router) { }

  altaTipoDeIntegrantes(nombre: string, selectedOption: string) {
    const orden: number = parseInt(selectedOption);
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
    const nom = { nombre: nombre , activo: true, orden: orden};
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
        this.location.back();
      },
      (error) => {
        console.log('Error al crear el tipo de integrante:', error);
        this.error = 'Error al crear el tipo de integrante';
      }
    );
  }

  cancelar() {
    this.router.navigate(['/listar-tipo-de-integrantes']);
  }
}
