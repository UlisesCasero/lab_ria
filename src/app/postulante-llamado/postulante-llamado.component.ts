import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-postulante-llamado',
  templateUrl: './postulante-llamado.component.html',
  styleUrls: ['./postulante-llamado.component.scss']
})
export class PostulanteLlamadoComponent {
  PersonaData: any[] = []; 
  personaPaginated: any[] = [];

  error: String = '';
  llamadoId: number = 0;
  fechaHora: string = "";
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private location: Location) { }

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  searchTerm: string = '';  

  search() {
    console.log('Término de búsqueda:', this.searchTerm);
    this.filtrarPersonas();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.llamadoId = params['llamadoId'];
      console.log("El llamado recibido es: " + this.llamadoId);
    });
    this.obtenerPersonas();
  }

  obtenerPersonas(){

    const url = `http://localhost:5000/api/Personas/Paged`;
    const filters = {
      activo: true
    };
    const bodyRequest = {
      limit: -1,
      offset: 0,
      filters: filters,
      orders: ['']
    };

    this.http.post<any>(url, bodyRequest).subscribe(
      (response) => {       
        this.PersonaData = response.list;
        this.totalItems = response.totalCount;
        this.actualizarDatosPaginados(); // Actualizar datos paginados después de recibir los usuarios
      },
      (error) => {
        console.log('Error al obtener los usuarios:', error);
        this.error = 'Error al obtener los usuarios';
      } 
    ); 
  }

  asignarLlamado(persona: any){
    const url = `http://localhost:5000/api/Postulantes`;
    const requestBody = {
      id: 0,
      activo: true,
      fechaHoraEntrevista: "2023-07-04T17:00:00.000Z",
      estudioMeritosRealizado: false,
      entrevistaRealizada: false,
      llamadoId: this.llamadoId,
      personaId: persona.id,
    };
    console.log(
      requestBody.activo,         
      requestBody.fechaHoraEntrevista,
      requestBody.estudioMeritosRealizado,
      requestBody.entrevistaRealizada,
      requestBody.llamadoId,
      requestBody.personaId,
      );

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


//ESTAS HACIENDO LAS COSAS PARA PODER AGREGAR FECHA Y HORA DE LAS ENTREVISTAS 
// DEBES SEGUIR CON ESTA FUNCION, SE DEBE ADAPTAR A LAS NECESIDADES PARA ESTO

  abrirVentanaAsignarFechaHora(persona: any) {
    Swal.fire({
      title: 'Asignar Fecha y Hora',
      html: '<input type="datetime-local" id="inputFechaHora" class="swal2-input">',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      didOpen: () => {
        // En este evento "didOpen", se ejecuta cuando la ventana emergente está abierta.
        // Aquí puedes realizar acciones adicionales si es necesario.
      },
      preConfirm: () => {
        const inputFechaHora = document.getElementById('inputFechaHora') as HTMLInputElement;
      const fechaHoraSeleccionada = inputFechaHora.value;

      
      const fechaHoraISO = new Date(fechaHoraSeleccionada).toISOString();
      this.fechaHora = fechaHoraISO;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.asignarLlamado(persona);
        console.log('Guardado');
      }
    });
  }
  

  filtrarPersonas() {
    this.personaPaginated = this.PersonaData.filter(persona =>
      persona.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  irPaginaAnterior() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.actualizarDatosPaginados();
    }
  }

  irPaginaSiguiente() {
    const totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.actualizarDatosPaginados();
    }
  }

  actualizarDatosPaginados() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.personaPaginated = this.PersonaData.slice(startIndex, endIndex);
  }

  getTotalItems(): number {
    return this.PersonaData.length;
  }

  getTotalPages(): number {
    return Math.ceil(this.getTotalItems() / this.itemsPerPage);
  }
  
}