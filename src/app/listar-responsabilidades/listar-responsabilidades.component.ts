import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-listar-responsabilidades',
  templateUrl: './listar-responsabilidades.component.html',
  styleUrls: ['./listar-responsabilidades.component.scss']
})
export class ListarResponsabilidadesComponent {
  resData: any[] = []; 
  resPaginated: any[] = [];
  res: any[] = [];

  public error: String = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  searchTerm: string = '';
  filtroActivos: boolean = false;

  search() {
        console.log('Término de búsqueda:', this.searchTerm);
  }
  
  constructor(private http: HttpClient, private router: Router, private location: Location) { }

  ngOnInit() {
    this.obtenerRes();
  }

  altaRes() {
    this.router.navigate(['alta-responsabilidades']);
  }
  
  obtenerRes() {
    const url = 'http://localhost:5000/api/Responsabilidades/Paged';
    const Body = {
      limit: -1,
      offset: 0,
      id: 0,
      filters: {
       // activo: null,
        nombre: ''
      },
      orders: ['']
    };

    this.http.post<any>(url, Body).subscribe(
      (response) => {       
        console.log('obtenidos');   
        this.resData = response.list;
        this.totalItems = response.totalCount;
        this.actualizarDatosPaginados();
      },
      (error) => {
        console.log('Error al obtener las res');
        this.error = `Error al obtener las res`;
      } 
    );
  }

  modificarRes(res: any) {
    const url = `http://localhost:5000/api/Responsabilidades/${res.id}`;
    const body = {
      "id": res.id,
      "activo": res.activo,
      "nombre": res.nombre,
      "descripcion": res.descripcion,
      "areaId": res.areaId,
      "area": {
        "id": res.area.id,
        "activo": res.area.activo,
        "nombre": res.area.nombre
      }
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Llamado:', response);   
        res = response;
        this.router.navigate(['modificar-responsabilidades', res.id]); 
      },
      (error) => {
        console.log('Error al modificar el res:', error);
        this.error = `Error al modificar el res`;
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
    this.resPaginated = this.resData.slice(startIndex, endIndex);
  }

  getTotalItems(): number {
    return this.resData.length;
  }

  getTotalPages(): number {
    return Math.ceil(this.getTotalItems() / this.itemsPerPage);
  }

  filtrarLlamados() {
    this.resPaginated = this.resData.filter(res =>
      res.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  activar(res: { activo: boolean; id: any; }) {
    res.activo = true;
  
    const url = `http://localhost:5000/api/Responsabilidades/${res.id}`;
  
    this.http.put<any>(url, res).subscribe(
      (response) => {       
        console.log('Responsabilidad modificada:', response);
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Responsabilidad activada correctamente',
          timer: 2000,
          timerProgressBar: true
        });
        this.obtenerRes();
      },
      (error) => {
        console.log('Error al modificar la responsabilidad:', error);
        this.error = 'Error al modificar la responsabilidad';
      }
    );
  }
  

 desactivar(res: { activo: boolean; id: any; }) {
  res.activo = false;

  const url = `http://localhost:5000/api/Responsabilidades/${res.id}`;

  this.http.put<any>(url, res).subscribe(
    (response) => {       
      console.log('Responsabilidad modificada:', response);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Responsabilidad desactivada correctamente',
        timer: 2000,
        timerProgressBar: true
      });
      this.obtenerRes();
    },
    (error) => {
      console.log('Error al modificar la responsabilidad:', error);
      this.error = 'Error al modificar la responsabilidad';
    }
  );
}

toggleFiltroActivos() {
  this.filtroActivos = !this.filtroActivos;
  this.filtrarRes();
}

filtrarRes() {
  this.currentPage = 1;
  const searchTerm = this.searchTerm.toLowerCase();

  if (this.filtroActivos) {
    this.resPaginated = this.res.filter(
      (res) =>
        res.activo && res.nombre.toLowerCase().includes(searchTerm)
    );
  } else {
    this.resPaginated = this.res.filter((res) =>
      res.nombre.toLowerCase().includes(searchTerm)
    );
  }

  this.totalItems = this.resPaginated.length;
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
}
