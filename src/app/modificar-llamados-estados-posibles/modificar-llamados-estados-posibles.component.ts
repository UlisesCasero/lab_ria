import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modificar-llamados-estados-posibles',
  templateUrl: './modificar-llamados-estados-posibles.component.html',
  styleUrls: ['./modificar-llamados-estados-posibles.component.scss']
})
export class ModificarLlamadosEstadosPosiblesComponent {

  public llamado: any;
  public nombre: String = '';
  public idLlamado: number = 0;
  public error: String = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.obtenerLlamado(id);
    });
  }

  obtenerLlamado(id: number) {
    const url = `http://localhost:5000/api/LlamadosEstadosPosibles/${this.idLlamado}`;    
    this.http.get<any>(url).subscribe(
      (response) => {       
        console.log('Llamado:', response);   
        this.llamado = response;   
      },
      (error) => {
        console.log('Error al obtener el llamado:', error);
        this.error = `Error al obtener el llamado`;
      }
    );
  }

  modificarLlamadosEstadosPosibles(){
    const url = `http://localhost:5000/api/LlamadosEstadosPosibles/${this.llamado.id}`;
    const body = {
      id: this.llamado.id,
      activo: this.llamado.activo,
      nombre: this.llamado.nombre,      
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Llamado:', response);   
        this.llamado = response;  
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El llamado se modifico correctamente',
          timer: 2000,
          timerProgressBar: true
        });
        this.location.back(); 
      },
      (error) => {
        console.log('Error al obtener el llamado:', error);
        this.error = `Error al obtener el llamado`;
      }
    );
  }

  cancelar() {
    this.location.back();
  }
  
}

