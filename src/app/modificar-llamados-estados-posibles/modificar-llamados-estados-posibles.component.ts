import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modificar-llamados-estados-posibles',
  templateUrl: './modificar-llamados-estados-posibles.component.html',
  styleUrls: ['./modificar-llamados-estados-posibles.component.scss']
})
export class ModificarLlamadosEstadosPosiblesComponent {

  public llamado: any;
  public nombre: String = '';
  public idLlamado: number = 0;
  public error: String = '';

  constructor(private http: HttpClient) { }

  buscarArea() {
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

  modificarArea(){
    const url = `http://localhost:5000/api/LlamadosEstadosPosibles/${this.llamado.id}`;
    const body = {
      id: this.llamado.id,
      activo: this.llamado.activo,
      nombre: this.llamado.nombre,      
    };

    this.http.put<any>(url, body).subscribe(
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

