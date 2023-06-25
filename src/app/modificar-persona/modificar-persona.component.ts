import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-modificar-persona',
  templateUrl: './modificar-persona.component.html',
  styleUrls: ['./modificar-persona.component.scss']
})
export class ModificarPersonaComponent {
  public persona: any;
  public documentos: any[] = [];
  public documento: any = [];
  public documentoId: any = [];
  public error: String = '';  

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {   
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.obtenerPersona(id);
    });
    this.obtenerDocumentos();
  }

  obtenerDocumentos() {
    const url = `http://localhost:5000/api/TiposDeDocumentos/Paged`;
    const Body = {
      "limit": -1,
      "offset": 0,
      "id": 0,
      "filters": {
        "activo": true,
        "nombre": ""
      },
      "orders": [""]
    };

    this.http.post<any>(url, Body).subscribe(
      (response) => {       
        console.log('Entro'); 
        console.log(response.list);  
        this.documentos = response.list;
      },
      (error) => {
        console.log('Error al obtener los documentos');
      } 
    );
  }

  buscarDocumento(documento: number) {
    const url = `http://localhost:5000/api/TiposDeDocumentos/${documento}`;

    return this.http.get<any>(url);
  }

  obtenerPersona(id: number) {
    const url = `http://localhost:5000/api/Personas/${id}`;
    this.http.get<any>(url).subscribe(
      (response) => {       
        console.log('Persona:', response);   
        this.persona = response;   
      },
      (error) => {
        console.log('Error al obtener el área:', error);
        this.error = `Error al obtener el área`;
      }
    );
  }


  modificarPersona(){
    console.log(this.persona.id);     
      const body = {
        "id": this.persona.id,
        "activo": true,
        "tipoDeDocumento": {
          "id": 0,
          "activo": true,
          "nombre": "string"
        },
        "documento": this.persona.documento,
        "primerNombre": this.persona.primerNombre,
        "segundoNombre": this.persona.segundoNombre,
        "primerApellido": this.persona.primerApellido,
        "segundoApellido": this.persona.segundoApellido
      };
      console.log(this.persona.id);
      const url = `http://localhost:5000/api/Personas/${this.persona.id}`;

      this.buscarDocumento(2).subscribe(
        (documentoRespuesta) => {
          body.tipoDeDocumento = documentoRespuesta; // Asigna el resultado de buscarArea al campo 'area' en requestBody
          console.log(body.tipoDeDocumento);
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
