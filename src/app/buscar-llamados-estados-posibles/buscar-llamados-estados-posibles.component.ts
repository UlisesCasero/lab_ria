import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-buscar-llamados-estados-posibles',
  templateUrl: './buscar-llamados-estados-posibles.component.html',
  styleUrls: ['./buscar-llamados-estados-posibles.component.scss']
})
export class BuscarLlamadosEstadosPosiblesComponent {

  public llamado: any;
  public idLlamado: number = 0;
  public error: String = '';

  constructor(private http: HttpClient) { }

  buscarLlamadosEstadosPosibles() {
    const url = `http://localhost:5000/api/LlamadosEstadosPosibles/${this.idLlamado}`;    
    this.http.get<any>(url).subscribe(
      (response) => {       
        console.log('Llamado:', response);   
        this.llamado = response;
      },
      (error) => {
        console.log('Error al obtener el llamado:', error);
        this.error = `Error al obtener el llamado`;
      }
    );
  }
  
}
