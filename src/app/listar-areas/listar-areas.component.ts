import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-areas',
  templateUrl: './listar-areas.component.html',
  styleUrls: ['./listar-areas.component.scss']
})
export class ListarAreasComponent {
  areaData: any[] = []; 
  areaPaginated: any[] = [];

  public error: String = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  
  constructor(private http: HttpClient, private router: Router, private location: Location) { }

  ngOnInit() {
    this.obtenerArea();
  }

  altaAreas() {
    this.router.navigate(['alta-areas']);
  }
  
  obtenerArea() {
    const url = 'http://localhost:5000/api/Areas/Paged';
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
        console.log('Area:', response);   
        this.areaData = response.list;
        this.totalItems = response.totalCount;
        this.actualizarDatosPaginados();
      },
      (error) => {
        console.log('Error al obtener las áreas');
        this.error = `Error al obtener las áreas`;
      } 
    );
  }

  eliminarArea(area: any) {
    const url = `http://localhost:5000/api/Areas/${area.id}`;
    const body = {
      id: area.id,
      activo: false,
      nombre: area.nombre,      
    };
    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Área:', response);   
        area = response; 
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El área se elimino correctamente',
          timer: 2000,
          timerProgressBar: true
        });  
        this.obtenerArea();
      },
      (error) => {
        console.log('Error al eliminar el área:', error);
        this.error = `Error al eliminar el área`;
      }
    );
  }

  modificarArea(area: any) {
    const url = `http://localhost:5000/api/Areas/${area.id}`;
    const body = {
      id: area.id,
      activo: area.activo,
      nombre: area.nombre,      
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Área:', response);   
        area = response;
        this.router.navigate(['modificar-area', area.id]); 
      },
      (error) => {
        console.log('Error al modificar el área:', error);
        this.error = `Error al modificar el área`;
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
    this.areaPaginated = this.areaData.slice(startIndex, endIndex);
  }

  getTotalItems(): number {
    return this.areaData.length;
  }

  getTotalPages(): number {
    return Math.ceil(this.getTotalItems() / this.itemsPerPage);
  }
}

