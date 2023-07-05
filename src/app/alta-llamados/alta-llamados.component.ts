import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-alta-llamados',
  templateUrl: './alta-llamados.component.html',
  styleUrls: ['./alta-llamados.component.scss']
})

export class AltaLlamadosComponent {
  llamado: any = [];
  areas: any[] = [];
  area: any = [];
  public error: String = '';

  constructor(private http: HttpClient) { }

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

  registrarLlamado(form: NgForm){
    if (form.valid) {
      const url = 'http://localhost:5000/api/Llamados';
      const requestBody = {
        id: 0,
        activo: true,
        identificador: form.value.identificador,
        nombre: form.value.nombre,
        linkPlanillaPuntajes: form.value.linkPLanillaPuntajes,
        linkActa: form.value.linkActa,
        minutosEntrevista: form.value.minutosEntrevista,
        areaId: form.value.idArea,
        area: null,
        postulantes: [],
        miembrosTribunal: [],
        llamadoEstados: [],// todo estado por el que paso
        ultimoEstado: null // estado actual 
      };

      this.buscarArea(form.value.idArea).subscribe(
        (areaRespuesta) => {
          requestBody.area = areaRespuesta; 
  
          this.http.post<any>(url, requestBody).subscribe(
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
  }

}
