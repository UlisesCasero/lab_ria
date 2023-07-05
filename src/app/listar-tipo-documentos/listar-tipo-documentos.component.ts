import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-tipo-documentos',
  templateUrl: './listar-tipo-documentos.component.html',
  styleUrls: ['./listar-tipo-documentos.component.scss']
})
export class ListarTipoDocumentosComponent {
  Documentos: any[] = [];
  DocumentoData: any[] = [];
  DocumentoPaginated: any[] = [];
  public error: String = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router, private location: Location) {}

  ngOnInit() {
    this.obtenerTipoDocumentos();
  }

  altaDocumento() {
    this.router.navigate(['alta-documento']);
  }

  obtenerTipoDocumentos() {
    const url = 'http://localhost:5000/api/TiposDeDocumentos/Paged';
    const body = {
      limit: -1,
      offset: 0,
      id: 0,
      filters: {
        activo: true,
        nombre: ''
      },
      orders: ['']
    };
  
    this.http.post<any>(url, body).subscribe(
      (response) => {
        console.log('Documentos:', response);
        this.Documentos = response.list;
        this.totalItems = response.totalCount;
        this.DocumentoData = this.Documentos;
        this.actualizarDatosPaginados();
      },
      (error) => {
        console.log('Error al obtener los documentos');
        this.error = `Error al obtener los documentos`;
      }
    );
  }  

  eliminarDocumento(Documento: any) {
    const url = `http://localhost:5000/api/TiposDeDocumentos/${Documento.id}`;
    const body = {
      id: Documento.id,
      activo: false,
      nombre: Documento.nombre,
    };
    this.http.put<any>(url, body).subscribe(
      (response) => {
        console.log('Documento:', response);
        Documento = response;
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El documento se eliminó correctamente',
          timer: 2000,
          timerProgressBar: true
        });
        this.obtenerTipoDocumentos();
      },
      (error) => {
        console.log('Error al obtener el documento:', error);
        this.error = `Error al obtener el documento`;
      }
    );
  }

  modificarDocumento(Documento: any) {
    const url = `http://localhost:5000/api/TiposDeDocumentos/${Documento.id}`;
    const body = {
      id: Documento.id,
      activo: Documento.activo,
      nombre: Documento.nombre,
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {
        console.log('Documento:', response);
        Documento = response;
        this.router.navigate(['modificar-documento', Documento.id]);
      },
      (error) => {
        console.log('Error al modificar el documento:', error);
        this.error = `Error al modificar el documento`;
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
    this.DocumentoPaginated = this.DocumentoData.slice(startIndex, endIndex);
  }  

  getTotalItems(): number {
    return this.DocumentoData.length;
  }

  getTotalPages(): number {
    return Math.ceil(this.getTotalItems() / this.itemsPerPage);
  }

  filtrarLlamados() {
    this.currentPage = 1;
    if (this.searchTerm.trim() === '') {
      this.DocumentoData = [...this.Documentos];
    } else {
      const filteredData = this.Documentos.filter(documento =>
        documento.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.DocumentoData = filteredData;
    }
    this.totalItems = this.DocumentoData.length;
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
