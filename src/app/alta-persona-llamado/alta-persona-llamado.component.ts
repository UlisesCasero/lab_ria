import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-alta-persona-llamado',
  templateUrl: './alta-persona-llamado.component.html',
  styleUrls: ['./alta-persona-llamado.component.scss']
})
export class AltaPersonaLlamadoComponent {
  persona: any = [];
  tiposDocumentos: any[] = [];
  llamadoId: number = 0;
  public error: String = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.llamadoId = params['llamadoId'];
      console.log("El llamado recibido es: " + this.llamadoId);
    });
    this.obtenerTipoDocumentos();
  }

  obtenerTipoDocumentos() {
    const url = 'http://localhost:5000/api/TiposDeDocumentos/Paged';
    const Body = {
      limit: -1,
      offset: 0,
      id: 0,
      filters: {
        activo: true},
      orders: ['']
    };

    this.http.post<any>(url, Body).subscribe(
      (response) => {       
        console.log('Entro');   
        this.tiposDocumentos = response.list;
      },
      (error) => {
        console.log('Error al obtener los documents');
      } 
    );
  }
  
  asignarPersonaLlamado(persona: any){
    console.log("Persona a Llamado ", persona);
    console.log("Id Llamado ", this.llamadoId);
    const url = `http://localhost:5000/api/Postulantes`;
    const requestBody = {
      id: 0,
      activo: true,
      fechaHoraEntrevista: null,
      estudioMeritosRealizado: false,
      entrevistaRealizada: false,
      llamadoId: this.llamadoId,
      personaId: persona.id,
    };

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
  }

  registrarPersonaLlamado(form: NgForm){
    if (form.valid) {
      const url = `http://localhost:5000/api/Personas`;
      const requestBody = {
        activo: true,
        tipoDeDocumento: {
          id: form.value.tipoDocumentoId,
          activo: true,
          nombre: form.value.documento
        },
        documento: form.value.documento,
        primerNombre: form.value.primerNombre,
        segundoNombre: form.value.segundoNombre,
        primerApellido: form.value.primerApellido,
        segundoApellido: form.value.segundoApellido
      };
      
      this.http.post<any>(url, requestBody)
      .subscribe(
        response => {
          console.log("EL id del llamdo es "+this.llamadoId);
          this.persona = response;
          console.log("Persona", this.persona);
          this.asignarPersonaLlamado(this.persona);
        },
        error => {
          console.log('Hubo un error');
        }
      );  
    }


  }
}
