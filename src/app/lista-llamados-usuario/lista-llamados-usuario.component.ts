import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lista-llamados-usuario',
  templateUrl: './lista-llamados-usuario.component.html',
  styleUrls: ['./lista-llamados-usuario.component.scss']
})
export class ListaLlamadosUsuarioComponent {
  listaCompleta: any[] = [];
  llamadoData: any[] = []; 
  llamadoPaginated: any[] = [];
  llamado: any;
  persona: any;
  id = sessionStorage.getItem('id');

  estado: any;
  estadoId: number = 0;
  estadosPosibles: any[] = [];

  postulanteData: any[] = [];
  docuemento = sessionStorage.getItem('documento');
  tipoDeDocumento = sessionStorage.getItem('tipoDeDocumento');

  public error: String = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router, private location: Location) { }

  ngOnInit() {
    this.obtenerUsuario();
    
  }

  obtenerUsuario(){
    const url = `http://localhost:5000/api/Personas/1/${this.docuemento}`; //cambiar por user.id
    this.http.get<any>(url).subscribe({
      next: (data) => {
        debugger
        this.obtenerLlamados();       
        this.persona = data;
      },
      error: (error) => {
        console.log('Error al obtener las áreas');
        this.error = `Error al obtener las áreas`;
      }
    })
  }

  obtenerLlamados() {
    const url = `http://localhost:5000/api/llamados/Paged`;
    const requestBody = {
      limit: -1,
      offset: 0,
      id: 0,
      filters: {
        activo: null,
        nombre: "",
        identificador: "",
        personaTribunalId: 0,
        estadoId: 0
      },
      orders: ['']  
    };    

    this.http.post<any>(url, requestBody).subscribe(
      (response) => {  
        debugger     
        console.log('obtenidos');
       //obtener documento del usuario de sesion   
        this.listaCompleta = response.list;
        console.log('Lista Obtenida');
        for (const llamadoReg of this.listaCompleta) {
          for (const pustulante of llamadoReg.postulantes) {
            //en este fi se debe comparar con el documento de la persona obtener los llamado
            if(pustulante.persona.documento == this.docuemento){
              this.llamadoData.push(llamadoReg);
              this.postulanteData.push(pustulante);
              console.log(pustulante.persona.primerNombre);
              this.totalItems++;
            }
            console.log(this.llamadoData.length);
        }       
        }
        this.actualizarDatosPaginados();
      },
      (error) => {
        console.log('Error al obtener las áreas');
        this.error = `Error al obtener las áreas`;
      } 
    );
  }







  asignarPostulante(llamadoId: number){
    this.router.navigate(['agregar-postulante', llamadoId]);
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
