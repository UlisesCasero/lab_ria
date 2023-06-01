import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modificar-tipo-documento',
  templateUrl: './modificar-tipo-documento.component.html',
  styleUrls: ['./modificar-tipo-documento.component.scss']
})
export class ModificarTipoDocumentoComponent {
  public documento: any;
  public nombre: String = '';
  public idDocumento: number = 0;
  public error: String = '';

  constructor(private http: HttpClient) { }

  buscarDocumento() {
    const url = `http://localhost:5000/api/TiposDeDocumentos/${this.idDocumento}`;    
    this.http.get<any>(url).subscribe(
      (response) => {       
        console.log('Documento:', response);   
        this.documento = response;   
      },
      (error) => {
        console.log('Error al obtener el documento:', error);
        this.error = `Error al obtener el documento`;
      }
    );
  }

  modificarDocumento(){
    const url = `http://localhost:5000/api/TiposDeDocumentos/${this.documento.id}`;
    const body = {
      id: this.documento.id,
      activo: this.documento.activo,
      nombre: this.documento.nombre,      
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Documento:', response);   
        this.documento = response;   
      },
      (error) => {
        console.log('Error al obtener el documento:', error);
        this.error = `Error al obtener el documento`;
      }
    );
  }
}
