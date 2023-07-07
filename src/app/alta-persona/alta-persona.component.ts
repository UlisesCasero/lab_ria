import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-persona',
  templateUrl: './alta-persona.component.html',
  styleUrls: ['./alta-persona.component.scss']
})
export class AltaPersonaComponent {
  persona: any = [];
  tiposDocumentos: any[] = [];
  public error: String = '';

  constructor(private http: HttpClient) { }

  ngOnInit(){
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
  
  registrarPersona(form: NgForm){
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
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'La Persona se credó correctamente',
            timer: 2000,
            timerProgressBar: true
          });
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text:error,
            timer: 2000,
            timerProgressBar: true
          });
        }
      );  
    }


  }
}
