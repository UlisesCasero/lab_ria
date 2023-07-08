import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-tipo-documento',
  templateUrl: './alta-tipo-documento.component.html',
  styleUrls: ['./alta-tipo-documento.component.scss']
})
export class AltaTipoDocumentoComponent {
  public id: number = 0;
  public nombre: String ="";
  public activo: boolean = true;
  public error: String = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location, private router: Router) { }

  altaTipoDocumento(nombre: String){

    const url = `http://localhost:5000/api/TiposDeDocumentos`;
    const nom = { nombre: nombre , activo: true};
    this.http.post<any>(url, nom).subscribe(
      (response) => {
        console.log('Área creada:', response);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El tipo de documento se guardó correctamente',
          timer: 2000,
          timerProgressBar: true
        });
        this.location.back();
      },
      (error) => {
        console.log('Error al crear el tipo de documento:', error);
        this.error = 'Error al crear el tipo de documento';
      }
    );
  }

  cancelar() {
    this.router.navigate(['/listar-documentos']);
  }
  
}
