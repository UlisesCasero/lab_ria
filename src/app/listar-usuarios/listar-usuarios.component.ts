import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss']
})
export class ListarUsuariosComponent {
  UsuarioData: any[] = []; 
  usuarioPaginated: any[] = [];

  public error: String = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  searchTerm: string = '';

  search() {
    console.log('Término de búsqueda:', this.searchTerm);
    this.filtrarLlamados();
  }
  

  constructor(private http: HttpClient, private router: Router, private location: Location) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  altaUsuario() {
    this.router.navigate(['alta-usuario']);
  }
  
  obtenerUsuarios() {
    const url = 'http://localhost:5000/api/Auth/Users';
    const filters = {
      activo: true
    };
    const request = {
      limit: 22,
      offset: 1,
      filters: filters,
      orders: ['']
    };
  
    this.http.post<any>(url, request).subscribe(
      (response) => {       
        this.UsuarioData = response.list;
        this.totalItems = response.totalCount;
        this.actualizarDatosPaginados(); // Actualizar datos paginados después de recibir los usuarios
      },
      (error) => {
        console.log('Error al obtener los usuarios:', error);
        this.error = 'Error al obtener los usuarios';
      } 
    );    
  }
  
  filtrarLlamados() {
    this.usuarioPaginated = this.UsuarioData.filter(usuario =>
      usuario.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  eliminarUsuario(usuario: any) {
    const url = `http://localhost:5000/api/Auth/${usuario.id}`;
    const body = {      
      id: usuario.id,
      activo: false,
      tipoDeDocumento: {
        id: usuario.tipoDeDocumento.id,
        activo: true,
        nombre: usuario.tipoDeDocumento.nombre
      },
      documento: "string",
      primerNombre: usuario.primerNombre,
      segundoNombre: usuario.segundoNombre,
      primerApellido: usuario.primerApellido,
      segundoApellido: usuario.segundoApellido
    }
    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Persona:', response);   
        usuario = response; 
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El área se elimino correctamente',
          timer: 2000,
          timerProgressBar: true
        });  
        this.obtenerUsuarios();
      },
      (error) => {
        console.log('Error al eliminar la Persona:', error);
        this.error = `Error al eliminar la Persona`;
      }
    );
  }

  modificarUsuario(usuario: any) {
    const url = `http://localhost:5000/api/Personas/${usuario.id}`;
    const body = {
      id: usuario.id,
      activo: usuario.activo,
      tipoDeDocumento: {
        id: usuario.tipoDeDocumento.id,
        activo: usuario.tipoDeDocumento.activo,
        nombre: usuario.tipoDeDocumento.nombre
      },
      documento: usuario.documento,
      primerNombre: usuario.primerNombre,
      segundoNombre: usuario.segundoNombre,
      primerApellido: usuario.primerApellido,
      segundoApellido: usuario.segundoApellido    
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Persona:', response);   
        usuario = response;
        this.router.navigate(['modificar-usuario', usuario.id]); 
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
    this.usuarioPaginated = this.UsuarioData.slice(startIndex, endIndex);
  }

  getTotalItems(): number {
    return this.UsuarioData.length;
  }

  getTotalPages(): number {
    return Math.ceil(this.getTotalItems() / this.itemsPerPage);
  }
}
