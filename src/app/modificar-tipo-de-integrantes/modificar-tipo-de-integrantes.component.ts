import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modificar-tipo-de-integrantes',
  templateUrl: './modificar-tipo-de-integrantes.component.html',
  styleUrls: ['./modificar-tipo-de-integrantes.component.scss']
})
export class ModificarTipoDeIntegrantesComponent {
  public Integrantes: any;
  public nombre: String = '';
  public idIntegrante: number = 0;
  public error: String = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.obtenerIntegrante(id);
    });
  }
  
  obtenerIntegrante(id: number) {
    const url = `http://localhost:5000/api/TiposDeIntegrantes/${id}`;
    this.http.get<any>(url).subscribe(
      (response) => {       
        console.log('Integrante:', response);   
        this.Integrantes = response;   
      },
      (error) => {
        console.log('Error al obtener al integrante:', error);
        this.error = `Error al obtener al integrante`;
      }
    );
  }
  

  modificarIntegrantes(){
    const url = `http://localhost:5000/api/TiposDeIntegrantes/${this.Integrantes.id}`;
    const body = {
      id: this.Integrantes.idIntegrante,
      activo: this.Integrantes.activo,
      nombre: this.Integrantes.nombre,      
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Integrante:', response);   
        this.Integrantes = response;   
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El integrante se modifico correctamente',
          timer: 2000,
          timerProgressBar: true
        });
        this.location.back();
      },
      (error) => {
        console.log('Error al obtener el integrante:', error);
        this.error = `Error al obtener el integrante`;
      }
    );
  }
  
  cancelar() {
    this.location.back();
  }
}
