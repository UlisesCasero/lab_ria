import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

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

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.obtenerArea(id);
    });
  }
  
  obtenerArea(id: number) {
    const url = `http://localhost:5000/api/Areas/${id}`;
    this.http.get<any>(url).subscribe(
      (response) => {       
        console.log('Area:', response);   
        this.area = response;   
      },
      (error) => {
        console.log('Error al obtener el área:', error);
        this.error = `Error al obtener el área`;
      }
    );
  }
  

  modificarArea(){
    const url = `http://localhost:5000/api/Areas/${this.area.id}`;
    const body = {
      id: this.area.id,
     // activo: this.area.activo,
      nombre: this.area.nombre,      
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Area:', response);   
        this.area = response;   
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El área se modifico correctamente',
          timer: 2000,
          timerProgressBar: true
        });
        this.location.back();
      },
      (error) => {
        console.log('Error al obtener el area:', error);
        this.error = `Error al obtener el area`;
      }
    );
  }
  
  cancelar() {
    this.location.back();
  }
  
}
