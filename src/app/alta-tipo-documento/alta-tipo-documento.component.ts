import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

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

  constructor(private http: HttpClient) { }

  altaTipoDocumento(nombre: String){

      if (!nombre) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El nombre del tipo de documento no puede estar vacío',
          timer: 2000,
          timerProgressBar: true
        });
        return;
      }
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
      },
      (error) => {
        console.log('Error al crear el tipo de documento:', error);
        this.error = 'Error al crear el tipo de documento';
      }
    );
  }
}
