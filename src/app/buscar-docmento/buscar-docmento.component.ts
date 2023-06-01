import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //agregar en todos para get

@Component({
  selector: 'app-buscar-docmento',
  templateUrl: './buscar-docmento.component.html',
  styleUrls: ['./buscar-docmento.component.scss']
})
export class BuscarDocmentoComponent {
  public documento: any;
  public idDocumento: number = 0;
  public error: String = '';
 
  //cuando inicia elemnto
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.idDocumento = 0;
    // Lógica que deseas ejecutar cuando se inicialice el componente
  }

  getDocumento(id: number) {
    const url = `http://localhost:5000/api/TiposDeDocumentos/${id}`;
    this.http.get<any>(url).subscribe(
      (response) => {       
        console.log('Documento:', response);
        this.documento = response;
      },
      (error) => {
        console.log('Error al obtener el documento:', error);
        this.error = `Error al obtener el documento ${id}`;
      }
    );
  }

}
