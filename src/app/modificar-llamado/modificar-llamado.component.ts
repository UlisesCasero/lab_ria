import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modificar-llamado',
  templateUrl: './modificar-llamado.component.html',
  styleUrls: ['./modificar-llamado.component.scss']
})
export class ModificarLlamadoComponent {
  public llamado: any;
  public areas: any[] = [];
  public error: String = '';
  public area: any = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.obtenerAreas();
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.obtenerLlamado(id);
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

  obtenerLlamado(id: number) {
    const url = `http://localhost:5000/api/Llamados/${id}`;
    this.http.get<any>(url).subscribe(
      (response) => {       
        console.log('Llamado:', response);   
        this.llamado = response;   
      },
      (error) => {
        console.log('Error al obtener el área:', error);
        this.error = `Error al obtener el área`;
      }
    );
  }


  modificarLlamado(){
    console.log(this.llamado.id);  
      const body = {
        "id": this.llamado.id,
        "activo": true,
        "identificador": this.llamado.identificador,
        "nombre": this.llamado.nombre,
        "linkPlanillaPuntajes": this.llamado.linkPlanillaPuntajes,
        "linkActa": this.llamado.linkActa,
        "minutosEntrevista": this.llamado.minutosEntrevista,
        "areaId": this.llamado.areaId,
        "area": {}       
      };
      const url = `http://localhost:5000/api/Llamados/${this.llamado.id}`;
      this.buscarArea(this.llamado.areaId).subscribe(
        (areaRespuesta) => {
          body.area = areaRespuesta; // Asigna el resultado de buscarArea al campo 'area' en requestBody

          this.http.put<any>(url, body).subscribe(
            response => {
              if (response.statusOk) {
                Swal.fire({
                  icon: 'success',
                  title: 'Éxito',
                  text: 'El llamado se registro correctamente',
                  timer: 2000,
                  timerProgressBar: true
                });
                
              }
            },
            error => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, complete todos los campos',
                timer: 2000,
                timerProgressBar: true
              });
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
