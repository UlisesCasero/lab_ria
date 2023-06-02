import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eliminar-areas',
  templateUrl: './eliminar-areas.component.html',
  styleUrls: ['./eliminar-areas.component.scss']
})
export class EliminarAreasComponent {
  public area: any;
  public nombre: String = '';
  public idArea: number = 0;
  public error: String = '';

  constructor(private http: HttpClient) { }

  buscarArea() {
    const url = `http://localhost:5000/api/Areas/${this.idArea}`;    
    this.http.get<any>(url).subscribe(
      (response) => {       
        console.log('Area:', response);   
        this.area = response;   
      },
      (error) => {
        console.log('Error al obtener el area:', error);
        this.error = `Error al obtener el area`;
      }
    );
  }

  eliminarArea(){
    const url = `http://localhost:5000/api/Areas/${this.area.id}`;

    this.http.delete<any>(url).subscribe(
      (response) => {       
        console.log('Area:', response);   
        this.area = response;   
      },
      (error) => {
        console.log('Error al obtener el area:', error);
        this.error = `Error al obtener el area`;
      }
    );
  }
}
