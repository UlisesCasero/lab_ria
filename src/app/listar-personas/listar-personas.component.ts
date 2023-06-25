import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-personas',
  templateUrl: './listar-personas.component.html',
  styleUrls: ['./listar-personas.component.scss']
})
export class ListarPersonasComponent {
  PersonaData: any[] = []; 
  personaPaginated: any[] = [];

  public error: String = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  
  constructor(private http: HttpClient, private router: Router, private location: Location) { }

  ngOnInit() {
    this.obtenerPersonas();
  }

  altaPersona() {
    this.router.navigate(['alta-persona']);
  }
  
  obtenerPersonas() {
    const url = 'http://localhost:5000/api/Personas/Paged';
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
        console.log('Persona:', response);   
        this.PersonaData = response.list;
        this.totalItems = response.totalCount;
        this.actualizarDatosPaginados();
      },
      (error) => {
        console.log('Error al obtener las áreas');
        this.error = `Error al obtener las áreas`;
      } 
    );
  }

  eliminarPersona(persona: any) {
    const url = `http://localhost:5000/api/Personas/${persona.id}`;
    const body = {      
      "id": persona.id,
      "activo": false,
      "tipoDeDocumento": {
        "id": persona.tipoDeDocumento.id,
        "activo": true,
        "nombre": persona.tipoDeDocumento.nombre
      },
      "documento": "string",
      "primerNombre": persona.primerNombre,
      "segundoNombre": persona.segundoNombre,
      "primerApellido": persona.primerApellido,
      "segundoApellido": persona.segundoApellido
    }
    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Persona:', response);   
        persona = response; 
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El área se elimino correctamente',
          timer: 2000,
          timerProgressBar: true
        });  
        this.obtenerPersonas();
      },
      (error) => {
        console.log('Error al eliminar la Persona:', error);
        this.error = `Error al eliminar la Persona`;
      }
    );
  }

  modificarPersona(persona: any) {
    const url = `http://localhost:5000/api/Personas/${persona.id}`;
    const body = {
      "id": persona.id,
      "activo": persona.activo,
      "tipoDeDocumento": {
        "id": persona.tipoDeDocumento.id,
        "activo": persona.tipoDeDocumento.activo,
        "nombre": persona.tipoDeDocumento.nombre
      },
      "documento": persona.documento,
      "primerNombre": persona.primerNombre,
      "segundoNombre": persona.segundoNombre,
      "primerApellido": persona.primerApellido,
      "segundoApellido": persona.segundoApellido    
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Persona:', response);   
        persona = response;
        this.router.navigate(['modificar-persona', persona.id]); 
      },
      (error) => {
        console.log('Error al modificar la Persona:', error);
        this.error = `Error al modificar la Persona`;
      }
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
