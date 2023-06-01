import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    const url = `http://localhost:5000/api/TiposDeDocumentos`;
    const body = { nombre: nombre };
    this.http.post<any>(url, body).subscribe(
      (response) => {
        // Aquí puedes hacer lo que necesites con los datos del área devueltos
        console.log('Documento creado:', response);        
      },
      (error) => {
        console.log('Error al crear el documento:', error);
      this.error = 'Error al crear el documento';
      }
    );
  }
}
