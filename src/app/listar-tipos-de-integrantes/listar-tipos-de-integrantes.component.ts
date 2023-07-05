import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-tipos-de-integrantes',
  templateUrl: './listar-tipos-de-integrantes.component.html',
  styleUrls: ['./listar-tipos-de-integrantes.component.scss']
})
export class ListarTiposDeIntegrantesComponent {
  tiposIntegrantes: any[] = [];
  tiposIntegrantesData: any[] = [];
  tiposIntegrantesPaginated: any[] = [];
  tipoIntegrante: any;
  public error: String = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router, private location: Location) {}

  ngOnInit() {
    this.obtenertiposIntegrantes();
  }

  obtenertiposIntegrantes() {
    const url = `http://localhost:5000/api/TiposDeIntegrantes/Paged`;
    const Body = {
      limit: -1,
      offset: 0,
      id: 0,
      filters: {},
      orders: ['']
    };

    this.http.post<any>(url, Body).subscribe(
      (response) => {
        console.log('Llamados:', response);
        this.tiposIntegrantesData = response.list;
        this.totalItems = response.totalCount;        
        this.actualizarDatosPaginados();
      },
      (error) => {
        console.log('Error al obtener los llamados');
        this.error = `Error al obtener los llamados`;
      }
    );
  }

  eliminartipoIntegrante(tipoIntegrante: any) {
    const url = `http://localhost:5000/api/TiposDeIntegrantes/${tipoIntegrante.id}`;
    const body = {
      id: tipoIntegrante.id,
      activo: false,
      nombre: tipoIntegrante.nombre,
    };
    this.http.put<any>(url, body).subscribe(
      (response) => {
        
      },
      (error) => {
        console.log('Error al obtener el llamado:', error);
        this.error = `Error al obtener el llamado`;
      }
    );
  }

  modificartiposIntegrantes(tipoIntegrante: any) {
    const url = `http://localhost:5000/api/TiposDeIntegrantes/${tipoIntegrante.id}`;
    const body = {
      id: tipoIntegrante.id,
      activo: tipoIntegrante.activo,
      nombre: tipoIntegrante.nombre,
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {
        
      },
      (error) => {
        console.log('Error al obtener el llamado:', error);
        this.error = `Error al obtener el llamado`;
      }
    );
  }

  altatipoIntegrante() {
    this.router.navigate(['alta-tipo-integrante']);
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
    this.tiposIntegrantesPaginated = this.tiposIntegrantesData.slice(startIndex, endIndex);
  }

  getTotalItems(): number {
    return this.tiposIntegrantesData.length;
  }

  getTotalPages(): number {
    return Math.ceil(this.getTotalItems() / this.itemsPerPage);
  }
}
