import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscar-tipo-de-integrantes',
  templateUrl: './buscar-tipo-de-integrantes.component.html',
  styleUrls: ['./buscar-tipo-de-integrantes.component.scss']
})
export class BuscarTipoDeIntegrantesComponent {
  public integrante: any;
  public idIntegrante: number = 0;
  public error: String | null = null;

  constructor(private http: HttpClient) { }

  buscarTipoDeIntegrantes() {
    const url = `http://localhost:5000/api/TiposDeIntegrantes/${this.idIntegrante}`;    
    this.http.get<any>(url).subscribe(
      (response) => {       
        console.log('Area:', response);   
        this.integrante = response;   
        this.error = null;
      },
      (error) => {
        console.log('Error al obtener el tipo de Integrante:', error);
        this.error = `Error al obtener el tipo de Integrante`;
      }
    );
  }
}
