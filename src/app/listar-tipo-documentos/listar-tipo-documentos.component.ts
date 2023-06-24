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

  constructor(private http: HttpClient, private router: Router, private location: Location) {}

  ngOnInit() {
    this.obtenerTipoDocumentos();
  }

  altaDocumento() {
    this.router.navigate(['alta-documento']);
  }

  obtenerTipoDocumentos() {
    const url = 'http://localhost:5000/api/TiposDeDocumentos/Paged';
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
        console.log('Documentos:', response);   
        this.Documentos = response.list;   
        this.totalItems = response.totalCount;
        this.actualizarDatosPaginados();
      },
      (error) => {
        console.log('Error al obtener los documents');
        this.error = `Error al obtener los documents`;
      } 
    );
  }

  eliminarDocumento(Documento : any) {
    const url = `http://localhost:5000/api/TiposDeDocumentos/${Documento.id}`;
    const body = {
      id: Documento.id,
      activo: false,
      nombre: Documento.nombre,      
    };
    this.http.put<any>(url,body).subscribe(
      (response) => {       
        console.log('Documento:', response);   
        Documento = response;   
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El documento se elimino correctamente',
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
    this.DocumentoPaginated = this.Documentos.slice(startIndex, endIndex);
  }

  getTotalItems(): number {
    return this.Documentos.length;
  }

  getTotalPages(): number {
    return Math.ceil(this.getTotalItems() / this.itemsPerPage);
  }
}
