import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-llamados-estados-posibles',
  templateUrl: './listar-llamados-estados-posibles.component.html',
  styleUrls: ['./listar-llamados-estados-posibles.component.scss']
})
export class ListarLlamadosEstadosPosiblesComponent {
  Llamados: any[] = [];
  LlamadosData: any[] = []; 
  LlamadosPaginated: any[] = [];
  LlamadosFiltrados: any[] = []; 
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
    this.obtenerLlamadosEstadosPosibles();
    this.LlamadosFiltrados = this.Llamados;
  }

  altaLlamados() {
    this.router.navigate(['alta-llamados-estados-posibles']);
  }

  obtenerLlamadosEstadosPosibles() {
    const url = 'http://localhost:5000/api/LlamadosEstadosPosibles/Paged';
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
        console.log('Llamados:', response);   
        this.Llamados = response.list;   
        this.LlamadosData = response.list;
        this.totalItems = response.totalCount;
        this.actualizarDatosPaginados();
      },
      (error) => {
        console.log('Error al obtener los llamados');
        this.error = `Error al obtener los llamados`;
      } 
    );
  }

  eliminarLlamadosEstadosPosibles(Llamados : any) {
    const url = `http://localhost:5000/api/LlamadosEstadosPosibles/${Llamados.id}`;
    const body = {
      id: Llamados.id,
      activo: false,
      nombre: Llamados.nombre,      
    };
    this.http.put<any>(url,body).subscribe(
      (response) => {       
        console.log('Llamados:', response);   
        Llamados = response;   
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El llamado se elimino correctamente',
          timer: 2000,
          timerProgressBar: true
        });  
        this.obtenerLlamadosEstadosPosibles();
      },
      (error) => {
        console.log('Error al obtener el llamado:', error);
        this.error = `Error al obtener el llamado`;
      }
    );
  }

  modificarLlamadosEstadosPosibles(Llamados : any){
    const url = `http://localhost:5000/api/LlamadosEstadosPosibles/${Llamados.id}`;
    const body = {
      id: Llamados.id,
      activo: Llamados.activo,
      nombre: Llamados.nombre,      
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Llamado:', response);   
        Llamados = response;   
        this.router.navigate(['modificar-llamados-estados-posibles', Llamados.id]); 
      },
      (error) => {
        console.log('Error al obtener el llamado:', error);
        this.error = `Error al obtener el llamado`;
      }
    );
  }

  filtrarLlamados() {
    this.LlamadosPaginated = this.LlamadosData.filter(llamado =>
      llamado.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
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
    this.LlamadosPaginated = this.Llamados.slice(startIndex, endIndex); // Use 'this.Documentos' instead of 'this.DocumentoData'
  }
  

  getTotalItems(): number {
    return this.Llamados.length;
  }  

  getTotalPages(): number {
    return Math.ceil(this.getTotalItems() / this.itemsPerPage);
  }
}
