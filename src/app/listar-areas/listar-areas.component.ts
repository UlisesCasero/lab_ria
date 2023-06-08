import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listar-areas',
  templateUrl: './listar-areas.component.html',
  styleUrls: ['./listar-areas.component.scss']
})
export class ListarAreasComponent {
  Area: any[] = [];
  public error: String = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.obtenerArea();
  }

  obtenerArea() {
    const url = 'http://localhost:5000/api/Areas/Paged';
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
        console.log('Area:', response);   
        this.Area = response.list;   
      },
      (error) => {
        console.log('Error al obtener las area');
        this.error = `Error al obtener las area`;
      } 
    );
  }

  eliminarArea(Area : any) {
    const url = `http://localhost:5000/api/Areas/${Area.id}`;
    const body = {
      id: Area.id,
      activo: false,
      nombre: Area.nombre,      
    };
    this.http.put<any>(url,body).subscribe(
      (response) => {       
        console.log('Area:', response);   
        Area = response;   
      },
      (error) => {
        console.log('Error al obtener el area:', error);
        this.error = `Error al obtener el area`;
      }
    );
  }

  modificarArea(Area : any){
    const url = `http://localhost:5000/api/Areas/${Area.id}`;
    const body = {
      id: Area.id,
      activo: Area.activo,
      nombre: Area.nombre,      
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Area:', response);   
        Area = response;   
      },
      (error) => {
        console.log('Error al obtener el area:', error);
        this.error = `Error al obtener el area`;
      }
    );
  }
}
