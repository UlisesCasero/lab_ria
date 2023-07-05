import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asignar-tribunal',
  templateUrl: './asignar-tribunal.component.html',
  styleUrls: ['./asignar-tribunal.component.scss']
})
export class AsignarTribunalComponent {
  
  constructor(private route: ActivatedRoute, private http: HttpClient) { }
  
  llamadoId: number = 0;
  llamado: any;
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.llamadoId = params['llamadoId'];
      console.log("El llamado recibido es: " + this.llamadoId);
    });
    this.obtenerUsuariosTribunal();
    this.obtenerTiposIntegrantes();
    this.obtenerTribunal();
  } 

  listaUsuarios: any[] = [];
  
  tribunalMiembro: any
  tribunal: number = 0;
  
  usuariosTribunal: any[] = [];
 
  setTribunal: any[] = [];
  error: String = '';
  miembroNuevo: any;

  // Tipos integrantes
  tiposIntegrantes: any[] = [];
  tipoIntegrante: any;

  obtenerUsuariosTribunal() {
    console.log("obtien usuarios");
    const url = `http://localhost:5000/api/Auth/Users`;
    const requestBody = {
        limit: 22,
        offset: 0,
        id: 0,
        filters: {},
        orders: [""]
    };
    console.log("obtien request body");
    this.http.post<any>(url, requestBody).subscribe(
      (response) => {  
        console.log("obtien response");
        this.listaUsuarios =  response.list;
        console.log(this.listaUsuarios.length);
        for (const registro of  this.listaUsuarios) {
          if(registro.roles.includes("TRIBUNAL")){
            console.log("Los roles en este registro son " + registro.roles);
            console.log("Nombre " + registro.persona.primerNombre);
            this.usuariosTribunal.push(registro);
            
          }
        }
        
      },
      (error) => {
        console.log('Error al obtener los usuarios:', error);
        this.error = 'Error al obtener los usuarios';
      }
    );
  }

  obtenerTiposIntegrantes() {
    console.log("obtien integrantes");
    const url = `http://localhost:5000/api/TiposDeIntegrantes/Paged`;
    const requestBody = {
      "limit": -1,
      "offset": 0,
      "filters": {},
      "orders": ['']
    };
    console.log("obtien request body");
    this.http.post<any>(url, requestBody).subscribe(
      (response) => {  
        this.tiposIntegrantes =  response.list;       
      },
      (error) => {
        console.log('Error al obtener los usuarios:', error);
        this.error = 'Error al obtener los usuarios';
      }
    );
  }

  obtenerTribunal(){
    const url = `http://localhost:5000/api/Llamados/${this.llamadoId}`;
    this.http.get<any>(url).subscribe(
      response => {
        this.llamado = response;
        this.setTribunal = this.llamado.miembrosTribunal;
      },
      error => {
        console.log('Hubo un error');
      },
    );

  }



  registrarMiembroTribunal(form: NgForm){
      console.log("PERSONAID: "+form.value.personaId)
      console.log("TIPODEINTEGRANTEID: "+form.value.tipoDeIntegranteId)
      console.log("LLAMADOID: "+this.llamadoId)
      console.log("EL ORDEN ES: "+this.tiposIntegrantes.find(tipoIntegrante => tipoIntegrante.id == form.value.tipoDeIntegranteId).orden)

        const url = `http://localhost:5000/api/MiembrosTribunales`;
        const requestBody = {
          activo: true,
          orden: this.tiposIntegrantes.find(tipoIntegrante => tipoIntegrante.id == form.value.tipoDeIntegranteId).orden,
          renuncia: false,
          motivoRenuncia: "",
          llamadoId: this.llamadoId,
          personaId: form.value.personaId,
          tipoDeIntegranteId: form.value.tipoDeIntegranteId,
        };
        this.http.post<any>(url, requestBody).subscribe(
          response => {
            console.log("Lo logro");
            location.reload();
          },
          error => {
            console.log('Hubo un error');
          },
        );
  }
}
