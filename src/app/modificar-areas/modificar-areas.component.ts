import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modificar-areas',
  templateUrl: './modificar-areas.component.html',
  styleUrls: ['./modificar-areas.component.scss']
})
export class ModificarAreasComponent {
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

  modificarArea(){
    const url = `http://localhost:5000/api/Areas/${this.area.id}`;
    const body = {
      id: this.area.id,
      activo: this.area.activo,
      nombre: this.area.nombre,      
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Documento:', response);   
        this.area = response;   
      },
      (error) => {
        console.log('Error al obtener el area:', error);
        this.error = `Error al obtener el area`;
      }
    );
  }
}
