import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-listar-tipo-documentos',
  templateUrl: './listar-tipo-documentos.component.html',
  styleUrls: ['./listar-tipo-documentos.component.scss']
})
export class ListarTipoDocumentosComponent {
  Documentos: any[] = [];
  public error: String = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.obtenerTipoDocumentos();
  }

  obtenerTipoDocumentos() {
    const url = 'http://localhost:5000/api/TiposDeDocumentos/Paged';
    const Body = {
      limit: -1,
      offset: 0,
      id: 0,
      filters: {
        activo: true,
        nombre: ''
      },
      orders: ['']
    };

    this.http.post<any>(url, Body).subscribe(
      (response) => {       
        console.log('Documentos:', response);   
        this.Documentos = response.list;   
      },
      (error) => {
        console.log('Error al obtener los documents');
        this.error = `Error al obtener los documents`;
      } 
    );
  }

  eliminarDocumento(Documento : any) {
    const url = `http://localhost:5000/api/TiposDeDocumentos/${Documento.id}`;
    const body = {
      id: Documento.id,
      activo: false,
      nombre: Documento.nombre,      
    };
    this.http.put<any>(url,body).subscribe(
      (response) => {       
        console.log('Documento:', response);   
        Documento = response;   
      },
      (error) => {
        console.log('Error al obtener el documento:', error);
        this.error = `Error al obtener el documento`;
      }
    );
  }

}
