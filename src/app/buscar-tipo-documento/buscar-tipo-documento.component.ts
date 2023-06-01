import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-buscar-tipo-documento',
  templateUrl: './buscar-tipo-documento.component.html',
  styleUrls: ['./buscar-tipo-documento.component.scss']
})
export class BuscarTipoDocumentoComponent {
  public documento: any;
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

}
