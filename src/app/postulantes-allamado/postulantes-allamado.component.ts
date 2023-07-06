import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-postulantes-allamado',
  templateUrl: './postulantes-allamado.component.html',
  styleUrls: ['./postulantes-allamado.component.scss']
})
export class PostulantesALlamadoComponent {
  registroData: any[] = [];
  registrosPaginated: any[] = [];
  lista: any[] = [];

  llamadoId: number = 0;

  public error: String = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.llamadoId = params['llamadoId'];
      console.log("El llamado recibido es: " + this.llamadoId);
    });
    this.obtenerPostulantes();
  }

  altaPersona() {
    this.router.navigate(['alta-persona']);
  }

  obtenerPostulantes() {
    const url = 'http://localhost:5000/api/Postulantes/Paged';
    const todos = {
      "limit": -1,
      "offset": 0,
      "id": 0,
      "filters": {
        "activo": null,
        "nombre": ""
      },
      "orders": [""]
    };
    this.http.post<any>(url, todos).subscribe(
      (response) => {       
        let count = 0;  
        this.lista =  response.list;
        for (const registro of  this.lista) {
          console.log(registro.llamadoId);
          if(registro.llamadoId == this.llamadoId){
            console.log("entra");
            this.registroData.push(registro);
            count++;
          }
        }
        this.totalItems = count;
        this.actualizarDatosPaginados();
      },
      (error) => {
        console.log('Error al obtener las áreas');
        this.error = `Error al obtener las áreas`;
      } 
    );
  }

  estadoPostulante(registro: any, nuevoEstado: string){
    const url = `http://localhost:5000/api/Postulantes/${registro.id}`;
    const requestBody = {
      id: registro.id,
      activo: registro.activo,
      fechaHoraEntrevista: registro.fechaHoraEntrevista,
      estudioMeritosRealizado: registro.estudioMeritosRealizado,
      entrevistaRealizada: registro.entrevistaRealizada,
      llamadoId: registro.llamadoId,
      personaId: registro.persona.id,
    };
    if(nuevoEstado == "activar"){
      requestBody.activo = true;
    }
    else if(nuevoEstado == "eliminar"){
      requestBody.activo = false;
    }
    else if(nuevoEstado == "estudioMeritosRealizado"){
      requestBody.estudioMeritosRealizado = true;
    }
    else if(nuevoEstado == "entrevistaRealizada"){
      requestBody.entrevistaRealizada = true;
    }
    this.http.put<any>(url, requestBody).subscribe(
      (response) => {       
        console.log('Área:', response);   
        location.reload();  
      },
      (error) => {
        console.log('Error al eliminar el área:', error);
        this.error = `Error al eliminar el área`;
      }
    );
  }

  cancelar() {
    this.router.navigate(['/lista-llamados-tribunal']);
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
    this.registrosPaginated = this.registroData.slice(startIndex, endIndex);
  }

  getTotalItems(): number {
    return this.registroData.length;
  }

  getTotalPages(): number {
    return Math.ceil(this.getTotalItems() / this.itemsPerPage);
  }
}
