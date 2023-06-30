import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.scss']
})
export class AltaUsuarioComponent {
  usuario: any = [];
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
        activo: true,
        nombre: ''
      },
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

  
  
  registrarUsuario(form: NgForm){
    if (form.valid) {
      const requestBody = {
        id: "",
        tipoDeDocumento: form.value.tipoDocumentoId,
        documento: form.value.documento,
        primerNombre: form.value.primerNombre,
        segundoNombre: form.value.segundoNombre,
        primerApellido: form.value.primerApellido,
        segundoApellido: form.value.segundoApellido,
        email: form.value.email,
        imagen: "",
        activo: true,
      };
      const url = `http://localhost:5000/api/Auth/Register`;

      this.http.post<any>(url, requestBody)
      .subscribe(
        response => {
          if (response.statusOk) {
            console.log('Lo logro');
          } else {
            console.log('No lo logro');
          }
        },
        error => {
          console.log('Hubo un error');
        }
      );  
    }


  }
}
