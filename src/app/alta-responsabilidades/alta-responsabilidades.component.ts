import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alta-responsabilidades',
  templateUrl: './alta-responsabilidades.component.html',
  styleUrls: ['./alta-responsabilidades.component.scss']
})
export class AltaResponsabilidadesComponent {
  responsabilidad: any = [];
  areas: any[] = [];
  area: any = [];
  public error: String = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location, private router: Router) { }

  ngOnInit(){
   this.obtenerAreas();
  }

  obtenerAreas() {
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
        console.log('Entro');   
        this.areas = response.list;
      },
      (error) => {
        console.log('Error al obtener los documentos');
      } 
    );
  }

  buscarArea(area: number) {
    const url = 'http://localhost:5000/api/Areas/' + area;

    return this.http.get<any>(url);
  }

  
  registrarResponsabilidad(form: NgForm) {
    if (form.valid) {
      const url = 'http://localhost:5000/api/Responsabilidades';
      const requestBody = {
        id: 0,
        activo: true,
        nombre: form.value.nombre,
        descripcion: form.value.descripcion,
        areaId: form.value.idArea,
        area: null
      };
  
      this.buscarArea(form.value.idArea).subscribe(
        (areaRespuesta) => {
          requestBody.area = areaRespuesta;
  
          this.http.post<any>(url, requestBody).subscribe(
            response => {
              console.log('Respuesta:', response);
              Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'La responsabilidad se guardó correctamente',
                timer: 2000,
                timerProgressBar: true
              });
              this.location.back();
            },
            error => {
              console.log('Hubo un error al guardar la responsabilidad:', error);
            }
          );
        },
        (error) => {
          console.log('Error al obtener el área:', error);
        }
      );
    }
  }
  cancelar() {
    this.router.navigate(['/listar-responsabilidades']);
  }
  
}
