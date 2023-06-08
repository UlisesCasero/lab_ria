import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listar-llamados-estados-posibles',
  templateUrl: './listar-llamados-estados-posibles.component.html',
  styleUrls: ['./listar-llamados-estados-posibles.component.scss']
})
export class ListarLlamadosEstadosPosiblesComponent {
  Llamados: any[] = [];
  public error: String = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.obtenerLlamadosEstadosPosibles();
  }

  obtenerLlamadosEstadosPosibles() {
    const url = 'http://localhost:5000/api/LlamadosEstadosPosibles/Paged';
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
        console.log('Llamados:', response);   
        this.Llamados = response.list;   
      },
      (error) => {
        console.log('Error al obtener los llamados');
        this.error = `Error al obtener los llamados`;
      } 
    );
  }

  eliminarLlamadosEstadosPosibles(Llamados : any) {
    const url = `http://localhost:5000/api/LlamadosEstadosPosibles/${Llamados.id}`;
    const body = {
      id: Llamados.id,
      activo: false,
      nombre: Llamados.nombre,      
    };
    this.http.put<any>(url,body).subscribe(
      (response) => {       
        console.log('Llamados:', response);   
        Llamados = response;   
      },
      (error) => {
        console.log('Error al obtener el llamado:', error);
        this.error = `Error al obtener el llamado`;
      }
    );
  }

  modificarLlamadosEstadosPosibles(Llamados : any){
    const url = `http://localhost:5000/api/LlamadosEstadosPosibles/${Llamados.id}`;
    const body = {
      id: Llamados.id,
      activo: Llamados.activo,
      nombre: Llamados.nombre,      
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Documento:', response);   
        this.Llamados = response;   
      },
      (error) => {
        console.log('Error al obtener el llamado:', error);
        this.error = `Error al obtener el llamado`;
      }
    );
  }
}
