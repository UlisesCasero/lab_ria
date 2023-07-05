import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-tipo-de-integrantes',
  templateUrl: './listar-tipo-de-integrantes.component.html',
  styleUrls: ['./listar-tipo-de-integrantes.component.scss']
})
export class ListarTipoDeIntegrantesComponent {
  Integrantes: any[] = [];
  IntegrantesData: any[] = [];
  IntegrantesPaginated: any[] = [];
  public error: String = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router, private location: Location) {}

  ngOnInit() {
    this.obtenerTipoIntegrantes();
  }

  altaIntegrantes() {
    this.router.navigate(['alta-tipo-de-integrantes']);
  }

  obtenerTipoIntegrantes() {
    const url = 'http://localhost:5000/api/TiposDeIntegrantes/Paged';
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
        console.log('Integrantes:', response);
        this.Integrantes = response.list;
        this.totalItems = response.totalCount;
        this.IntegrantesData = this.Integrantes;
        this.actualizarDatosPaginados();
      },
      (error) => {
        console.log('Error al obtener los integrantes');
        this.error = `Error al obtener los integrantes`;
      }
    );
  }

  eliminarIntegrantes(Integrantes: any) {
    const url = `http://localhost:5000/api/TiposDeIntegrantes/${Integrantes.id}`;
    const body = {
      id: Integrantes.id,
      activo: false,
      nombre: Integrantes.nombre,
    };
    this.http.put<any>(url, body).subscribe(
      (response) => {
        console.log('Integrantes:', response);
        Integrantes = response;
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El Tipo de Integrante se elimino correctamente',
          timer: 2000,
          timerProgressBar: true
        });
        this.obtenerTipoIntegrantes();
      },
      (error) => {
        console.log('Error al obtener el integrante:', error);
        this.error = `Error al obtener el integrante`;
      }
    );
  }

  modificarIntegrantes(Integrantes: any) {
    const url = `http://localhost:5000/api/TiposDeIntegrantes/${Integrantes.id}`;
    const body = {
      id: Integrantes.id,
      activo: Integrantes.activo,
      nombre: Integrantes.nombre,
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {
        console.log('Integrante:', response);
        Integrantes = response;
        this.router.navigate(['modificar-tipo-de-integrantes', Integrantes.id]);
      },
      (error) => {
        console.log('Error al modificar el integrante:', error);
        this.error = `Error al modificar el integrante`;
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
    this.IntegrantesPaginated = this.IntegrantesData.slice(startIndex, endIndex);
  }

  getTotalItems(): number {
    return this.IntegrantesData.length;
  }

  getTotalPages(): number {
    return Math.ceil(this.getTotalItems() / this.itemsPerPage);
  }

  filtrarLlamados() {
    this.currentPage = 1;
    if (this.searchTerm.trim() === '') {
      this.IntegrantesData = [...this.Integrantes];
    } else {
      const filteredData = this.Integrantes.filter(integrante =>
        integrante.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.IntegrantesData = filteredData;
    }
    this.totalItems = this.IntegrantesData.length;
    this.actualizarDatosPaginados();
  }
  
  isCoordinador(): boolean {
    const rolesString = sessionStorage.getItem('roles');
    const roles = rolesString ? JSON.parse(rolesString) : [];
    return roles.includes('COORDINADOR');
  }
}
