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
  rolesUsuarios: any[] = [];
  filtroInactivo: boolean | undefined;
  
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
    this.actualizarDatosPaginados();
  }

  altaUsuario() {
    this.router.navigate(['alta-usuario']);
  }

  obtenerUsuarios() {
    const url = 'http://localhost:5000/api/Auth/Users';
    const filters = {
      //activo: true
    };
    const request = {
      limit: 22,
      offset: 0,
      filters: filters,
      orders: ['']
    };

    this.http.post<any>(url, request).subscribe(
      (response) => {
        this.UsuarioData = response.list;
        this.totalItems = response.totalCount;
        this.actualizarDatosPaginados();
      },
      (error) => {
        console.log('Error al obtener los usuarios:', error);
        this.error = 'Error al obtener los usuarios';
      }
    );
  }

  filtrarLlamados() {
    this.usuarioPaginated = this.UsuarioData.filter(usuario =>
      usuario.email.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.filtroInactivo === undefined || usuario.activo === !this.filtroInactivo || !this.filtroInactivo)
    );
  }
  
  cargarRoles(select: HTMLSelectElement) {
    this.http.get<string[]>('http://localhost:5000/api/Auth/Users/Roles').subscribe(
      response => {
        const roles = response;
        roles.forEach(function (rol) {
          const option = document.createElement('option');
          option.value = rol;
          option.text = rol;
          select.add(option);
        });
      },
      error => {
        console.log('Hubo un error al obtener los roles');
      }
    );
  }

  abrirVentanaAsignarRoles(usuario: any) {
    Swal.fire({
      title: 'Asignar Rol',
      html: '<select id="selectEstado" class="swal2-input"></select>',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      didOpen: () => {
        const select = document.getElementById('selectEstado') as HTMLSelectElement;
        this.cargarRoles(select);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const select = document.getElementById('selectEstado') as HTMLSelectElement;
        const rolSeleccionado = select.value;
        console.log('Rol seleccionado:', rolSeleccionado);
        this.asignarRoles(usuario.id, rolSeleccionado);
        console.log('Guardado');
      }
    });
  }

  asignarRoles(userId: string, roleId: string) {
    const url = 'http://localhost:5000/api/Auth/Users/UserRoles';
    const requestBody = {
      userId: userId,
      roleId: roleId
    };

    this.http.post<any>(url, requestBody).subscribe(
      response => {
        if (response.statusOk) {
          console.log('Rol asignado correctamente');
        } else {
          console.log('No se pudo asignar el rol');
          this.obtenerUsuarios();
          this.actualizarDatosPaginados();
        }
      },
      error => {
        console.log('Hubo un error al asignar el rol');
      }
    );
  }

  abrirVentanaEliminarRoles(usuario: any) {
    Swal.fire({
      title: 'Eliminar Rol',
      html: '<select id="selectRoles" class="swal2-input"></select>',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar',
      didOpen: () => {
        const select = document.getElementById('selectRoles') as HTMLSelectElement;
        this.cargarRolesUsuario(usuario.id, select);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const select = document.getElementById('selectRoles') as HTMLSelectElement;
        const roleId = select.value;
        console.log('Rol seleccionado:', roleId);
        this.eliminarRolUsuario(usuario.id, roleId);
      }
    });
  }

  cargarRolesUsuario(userId: string, select: HTMLSelectElement) {
    const url = 'http://localhost:5000/api/Auth/Users';

    const requestBody = {
      limit: 10,
      offset: 0,
      filters: {
        activo: true
      },
      orders: []
    };

    this.http.post<any>(url, requestBody).subscribe(
      response => {
        const usuarios = response.list;
        const usuario = usuarios.find((usuario: any) => usuario.id.toString() === userId);
        if (usuario) {
          const rolesUsuario = usuario.roles;
          console.log('Roles del usuario:', rolesUsuario);
          select.innerHTML = '';

          rolesUsuario.forEach((rol: string) => {
            const option = document.createElement('option');
            option.value = rol;
            option.text = rol;
            select.appendChild(option);
          });
        } else {
          console.log('No se encontró el usuario');
        }
      },
      error => {
        console.log('Hubo un error al obtener los roles del usuario');
      }
    );
  }

  eliminarRolUsuario(userId: string, roleId: string) {
    const url = `http://localhost:5000/api/Auth/Users/UserRoles`;
    const requestBody = {
      userId: userId,
      roleId: roleId
    };

    this.http.delete<any>(url, { body: requestBody }).subscribe(
      response => {
        if (response.statusOk) {
          console.log('Rol eliminado correctamente');
          this.obtenerUsuarios();
        } else {
          this.obtenerUsuarios();
          this.actualizarDatosPaginados();
          console.log('No se pudo eliminar el rol');
        }
      },
      error => {
        console.log('Hubo un error al eliminar el rol');
      }
    );
  }

  eliminarUsuario(usuario: any) {
    const url = `http://localhost:5000/api/Auth/Users`;
    const body = {
      id: usuario.id,
      tipoDocumentoId: usuario.persona.tipoDeDocumento.id,
      documento: usuario.persona.documento,
      primerNombre: usuario.persona.primerNombre,
      primerApellido: usuario.persona.primerApellido,
      email: usuario.email,
      activo: false
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {
        console.log('Usuario:', response);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El usuario se eliminó correctamente',
          timer: 2000,
          timerProgressBar: true
        });
        this.obtenerUsuarios();
      },
      (error) => {
        console.log('Error al eliminar el usuario:', error);
        this.error = 'Error al eliminar el usuario';
      }
    );
  }

   activarUsuario(usuario: any) {
    const url = `http://localhost:5000/api/Auth/Users`;
    const body = {
      id: usuario.id,
      tipoDocumentoId: usuario.persona.tipoDeDocumento.id,
      documento: usuario.persona.documento,
      primerNombre: usuario.persona.primerNombre,
      primerApellido: usuario.persona.primerApellido,
      email: usuario.email,
      activo: true
    };
    
    this.http.put<any>(url, body).subscribe(
      (response) => {
        console.log('Usuario:', response);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El usuario se activo correctamente',
          timer: 2000,
          timerProgressBar: true
        });
        this.obtenerUsuarios();
      },
      (error) => {
        console.log('Error al eliminar el usuario:', error);
        this.error = 'Error al eliminar el usuario';
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