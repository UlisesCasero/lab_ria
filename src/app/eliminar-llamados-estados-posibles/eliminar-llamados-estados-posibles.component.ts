import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eliminar-llamados-estados-posibles',
  templateUrl: './eliminar-llamados-estados-posibles.component.html',
  styleUrls: ['./eliminar-llamados-estados-posibles.component.scss']
})
export class EliminarLlamadosEstadosPosiblesComponent {
  public llamado: any;
  public nombre: String = '';
  public idLlamado: number = 0;
  public error: String = '';

  constructor(private http: HttpClient) { }

  buscarLlamado() {
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

  eliminarLlamado(){
    const url = `http://localhost:5000/api/LlamadosEstadosPosibles/${this.llamado.id}`;

    this.http.delete<any>(url).subscribe(
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
