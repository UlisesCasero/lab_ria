import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alta-areas',
  templateUrl: './alta-areas.component.html',
  styleUrls: ['./alta-areas.component.scss']
})
export class AltaAreasComponent {
  public id: number = 0;
  public nombre: String = "";
  public activo: boolean = true;
  public error: String = '';

  constructor(private http: HttpClient) { }

  altaAreas(nombre: String) {
    const url = `http://localhost:5000/api/Areas`;
    const nom = { nombre: nombre };
    this.http.post<any>(url, nom).subscribe(
      (response) => {
        console.log('Area creada:', response);
      },
      (error) => {
        console.log('Error al crear el area:', error);
        this.error = 'Error al crear el area';
      }
    );
  }
}
