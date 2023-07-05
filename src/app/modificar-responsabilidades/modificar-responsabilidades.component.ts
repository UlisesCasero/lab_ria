import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-modificar-responsabilidades',
  templateUrl: './modificar-responsabilidades.component.html',
  styleUrls: ['./modificar-responsabilidades.component.scss']
})
export class ModificarResponsabilidadesComponent {
  public res: any;
  public areas: any[] = [];
  public error: String = '';
  public area: any = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.obtenerAreas();
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.obtenerRes(id);
    });
  }

  obtenerAreas() {
    const url = `http://localhost:5000/api/Areas/Paged`;
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
        console.log('Error al obtener los documents');
      } 
    );
  }

  buscarArea(area: number) {
    const url = `http://localhost:5000/api/Areas/${area}`;

    return this.http.get<any>(url);
  }

  obtenerRes(id: number) {
    const url = `http://localhost:5000/api/Responsabilidades/${id}`;
    this.http.get<any>(url).subscribe(
      (response) => {       
        console.log('Llamado:', response);   
        this.res = response;   
      },
      (error) => {
        console.log('Error al obtener el área:', error);
        this.error = `Error al obtener el área`;
      }
    );
  }


  modificarRes(){
    console.log(this.res.id);     
      const body = {
        "id": this.res.id,
        "activo": true,
        "nombre": this.res.nombre,
        "descripcion": this.res.descripcion,
        "areaId": this.res.areaId,
        "area": {
          "id": 0,
            "activo": true,
            "nombre": "string"
        }       
      };
      const url = `http://localhost:5000/api/Responsabilidades/${this.res.id}`;
      this.buscarArea(this.res.areaId).subscribe(
        (areaRespuesta) => {
          body.area = areaRespuesta; 

          this.http.put<any>(url, body).subscribe(
            response => {
              if (response.statusOk) {
                console.log('Lo logró');
              } else {
                console.log('No lo logró');
              }
            },
            error => {
              console.log('Hubo un error');
            }
          );
        },
        (error) => {
          console.log('Error al obtener el área:', error);
        }
      );
  }
  
  cancelar() {
    this.location.back();
  }
}
