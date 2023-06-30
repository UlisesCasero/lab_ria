import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listar-llamados',
  templateUrl: './listar-llamados.component.html',
  styleUrls: ['./listar-llamados.component.scss']
})
export class ListarLlamadosComponent {
  llamadoData: any[] = []; 
  llamadoPaginated: any[] = [];

  public error: String = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  searchTerm: string = '';

  search() {
        console.log('Término de búsqueda:', this.searchTerm);
  }
  
  constructor(private http: HttpClient, private router: Router, private location: Location) { }

  ngOnInit() {
    this.obtenerLlamados();
  }

  altaLlamado() {
    this.router.navigate(['alta-llamado']);
  }
  
  obtenerLlamados() {
    const url = 'http://localhost:5000/api/llamados/Paged';
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
        console.log('obtenidos');   
        this.llamadoData = response.list;
        this.totalItems = response.totalCount;
        this.actualizarDatosPaginados();
      },
      (error) => {
        console.log('Error al obtener las áreas');
        this.error = `Error al obtener las áreas`;
      } 
    );
  }

  eliminarLlamado(llamado: any) {
    const url = `http://localhost:5000/api/Llamados/${llamado.id}`;
    const body = {
      "id": llamado.id,
      "activo": false,
      "identificador": llamado.identificador,
      "nombre": llamado.nombre,
      "linkPlanillaPuntajes": llamado.linkPlanillaPuntajes,
      "linkActa": llamado.linkActa,
      "minutosEntrevista": llamado.minutosEntrevista,
      "areaId": llamado.areaId,
      "area": {
        "id": llamado.area.id,
        "activo": llamado.area.activo,
        "nombre": llamado.area.nombre
      }
    };
    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Área:', response);   
        llamado = response;   
      },
      (error) => {
        console.log('Error al eliminar el área:', error);
        this.error = `Error al eliminar el área`;
      }
    );
  }

  modificarLlamado(llamado: any) {
    const url = `http://localhost:5000/api/Llamados/${llamado.id}`;
    const body = {
      "id": llamado.id,
      "activo": llamado.activo,
      "identificador": llamado.identificador,
      "nombre": llamado.nombre,
      "linkPlanillaPuntajes": llamado.linkPlanillaPuntajes,
      "linkActa": llamado.linkActa,
      "minutosEntrevista": llamado.minutosEntrevista,
      "areaId": llamado.areaId,
      "area": {
        "id": llamado.area.id,
        "activo": llamado.area.activo,
        "nombre": llamado.area.nombre
      }
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Llamado:', response);   
        llamado = response;
        this.router.navigate(['modificar-llamado', llamado.id]); 
      },
      (error) => {
        console.log('Error al modificar el Llamado:', error);
        this.error = `Error al modificar el Llamado`;
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
    this.llamadoPaginated = this.llamadoData.slice(startIndex, endIndex);
  }

  getTotalItems(): number {
    return this.llamadoData.length;
  }

  getTotalPages(): number {
    return Math.ceil(this.getTotalItems() / this.itemsPerPage);
  }

  filtrarLlamados() {
    this.llamadoPaginated = this.llamadoData.filter(llamado =>
      llamado.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
