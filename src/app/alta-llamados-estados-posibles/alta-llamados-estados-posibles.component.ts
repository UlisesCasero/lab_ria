import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alta-llamados-estados-posibles',
  templateUrl: './alta-llamados-estados-posibles.component.html',
  styleUrls: ['./alta-llamados-estados-posibles.component.scss']
})
export class AltaLlamadosEstadosPosiblesComponent {
  public id: number = 0;
  public nombre: String ="";
  public activo: boolean = true;
  public error: String = '';

  constructor(private http: HttpClient) { }

  altaLlamadosEstadosPosibles(nombre: String){
    const url = `http://localhost:5000/api/LlamadosEstadosPosibles`;
    const nom = { nombre: nombre };
    this.http.post<any>(url, nom).subscribe(
      (response) => {        
        console.log('LlamadosEstadosPosibles creado:', response);        
      },
      (error) => {
        console.log('Error al crear el LlamadoEstadosPosibles:', error);
      this.error = 'Error al crear el LlamadoEstadosPosibles';
      }
    );
  }
}
