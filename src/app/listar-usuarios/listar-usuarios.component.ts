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
  
  constructor(private http: HttpClient, private router: Router, private location: Location) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  altaUsuario() {
    this.router.navigate(['alta-usuario']);
  }
  
  obtenerUsuarios() {
    const url = `http://localhost:5000/api/Auth/Users/Basic`;
    /*const Body = {
      limit: -1,
      offset: 0,
      id: 0,
      filters: {
        activo: true,
        nombre: "",
        idUsuario: "",
        username: "",
        email: "",
        documento: ""
      },
      orders: [""]
    };*/

    this.http.get<any>(url).subscribe(
      (response) => {       
        //console.log('Usuario:', response);   
        //this.UsuarioData = response.list;
        //console.log('Es por aca 1');
        //this.totalItems = response.totalCount;
        //console.log('Es por aca 2');
        // this.actualizarDatosPaginados(); 
        //console.log('termino');

        this.UsuarioData = response.list;
      },
      (error) => {
        console.log('Error al obtener las áreas');
        this.error = `Error al obtener las áreas`;
      } 
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
