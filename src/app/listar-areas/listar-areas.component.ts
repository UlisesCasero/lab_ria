import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-areas',
  templateUrl: './listar-areas.component.html',
  styleUrls: ['./listar-areas.component.scss']
})
export class ListarAreasComponent {
  areas: any[] = [];
  areaData: any[] = [];
  areaPaginated: any[] = [];
  public error: String = '';
  filtroActivos: boolean = true;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router, private location: Location) {}

  ngOnInit() {
    this.obtenerAreas();
  }

  altaAreas() {
    this.router.navigate(['alta-areas']);
  }

  obtenerAreas() {
    const url = 'http://localhost:5000/api/Areas/Paged';
    const body = {
      limit: -1,
      offset: 0,
      id: 0,
      filters: {
        //activo: true,
        nombre: ''
      },
      orders: ['']
    };

    this.http.post<any>(url, body).subscribe(
      (response) => {
        console.log('Areas:', response);
        this.areas = response.list;
        this.totalItems = response.totalCount;
        this.areaData = this.areas;
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
          text: 'El área se eliminó correctamente',
          timer: 2000,
          timerProgressBar: true
        });
        this.obtenerAreas();
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

  filtrarLlamados() {
    this.currentPage = 1;
    if (this.searchTerm.trim() === '') {
      this.areaData = [...this.areas];
    } else {
      const filteredData = this.areas.filter(area =>
        area.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.areaData = filteredData;
    }
    this.totalItems = this.areaData.length;
    this.actualizarDatosPaginados();
  }

  toggleFiltroActivos() {
    this.filtroActivos = !this.filtroActivos;
    this.filtrarAreas();
  }

  filtrarAreas() {
    this.currentPage = 1;
    const searchTerm = this.searchTerm.toLowerCase();

    if (this.filtroActivos) {
      this.areaData = this.areas.filter(
        (areas) =>
          areas.activo && areas.nombre.toLowerCase().includes(searchTerm)
      );
    } else {
      this.areaData = this.areas.filter((areas) =>
        areas.nombre.toLowerCase().includes(searchTerm)
      );
    }

    this.totalItems = this.areaData.length;
    this.actualizarDatosPaginados();
  }

  isAdmin(): boolean {
    const rolesString = sessionStorage.getItem('roles');
    const roles = rolesString ? JSON.parse(rolesString) : [];
    return roles.includes('ADMIN');
  }
  
  isCoordinador(): boolean {
    const rolesString = sessionStorage.getItem('roles');
    const roles = rolesString ? JSON.parse(rolesString) : [];
    return roles.includes('COORDINADOR');
  }

  activiar(area: any) {
    const url = `http://localhost:5000/api/Areas/${area.id}`;
    const body = {
      id: area.id,
      activo: true,
      nombre: area.nombre,
    };
  
    this.http.put<any>(url, body).subscribe(
      (response) => {
        console.log('Area activaAda:', response);
        area.activo = false;
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El area se activado correctamente',
          timer: 2000,
          timerProgressBar: true
        });
        this.obtenerAreas();
      },
      (error) => {
        console.log('Error al activar el area:', error);
        this.error = 'Error al activar el area';
      }
    );
  }
}
