import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modificar-tipo-documento',
  templateUrl: './modificar-tipo-documento.component.html',
  styleUrls: ['./modificar-tipo-documento.component.scss']
})
export class ModificarTipoDocumentoComponent {
  public documento: any;
  public nombre: String = '';
  public idDocumento: number = 0;
  public error: String = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.obtenerDocumento(id);
    });
  }

  obtenerDocumento(id: number) {
    const url = `http://localhost:5000/api/TiposDeDocumentos/${id}`;
    this.http.get<any>(url).subscribe(
      (response) => {       
        console.log('Documento:', response);   
        this.documento = response;   
      },
      (error) => {
        console.log('Error al obtener el documento:', error);
        this.error = `Error al obtener el documento`;
      }
    );
  }

  modificarDocumento(){
    const url = `http://localhost:5000/api/TiposDeDocumentos/${this.documento.id}`;
    const body = {
      id: this.documento.id,
     // activo: this.documento.activo,
      nombre: this.documento.nombre,      
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Documento:', response);   
        this.documento = response;   
      },
      (error) => {
        console.log('Error al obtener el documento:', error);
        this.error = `Error al obtener el documento`;
      }
    );
  }

  cancelar() {
    this.location.back();
  }
  
}
