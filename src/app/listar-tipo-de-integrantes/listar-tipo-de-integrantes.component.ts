import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.obtenerTipoIntegrantes();
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
        this.actualizarDatosPaginados();
      },
      (error) => {
        console.log('Error al obtener los integrantes');
        this.error = `Error al obtener los integrantes`;
      } 
    );
  }

  eliminarIntegrantes(Integrantes : any) {
    const url = `http://localhost:5000/api/TiposDeIntegrantes/${Integrantes.id}`;
    const body = {
      id: Integrantes.id,
      activo: false,
      nombre: Integrantes.nombre,      
    };
    this.http.put<any>(url,body).subscribe(
      (response) => {       
        console.log('Integrantes:', response);   
        Integrantes = response;   
      },
      (error) => {
        console.log('Error al obtener el integrante:', error);
        this.error = `Error al obtener el integrante`;
      }
    );
  }

  modificarIntegrantes(Integrantes: number) {
    this.router.navigate(['modificar-integrante', Integrantes]);
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
    this.IntegrantesPaginated = this.Integrantes.slice(startIndex, endIndex);
  }

  getTotalItems(): number {
    return this.Integrantes.length;
  }

  getTotalPages(): number {
    return Math.ceil(this.getTotalItems() / this.itemsPerPage);
  }
}
