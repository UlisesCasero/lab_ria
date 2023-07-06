import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lista-llamados-tribunal',
  templateUrl: './lista-llamados-tribunal.component.html',
  styleUrls: ['./lista-llamados-tribunal.component.scss']
})
export class ListaLlamadosTribunalComponent {
  listaCompleta: any[] = [];
  llamadoData: any[] = []; 
  llamadoPaginated: any[] = [];
  llamado: any;
  persona: any;
  id: number = 7;

  estado: any;
  estadoId: number = 0;
  estadosPosibles: any[] = [];

  postulanteData: any[] = [];
  docuemento: string = "503233971";

  public error: String = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router, private location: Location) { }

  ngOnInit() {
    //this.obtenerUsuario();
    this.obtenerLlamados();
  }

  listarPostulantes(llamadoId: number) {
    this.router.navigate(['postulantes-a-llamado', llamadoId]);
  }

  obtenerUsuario(){
    const url = `http://localhost:5000/api/Personas/2`; //cambiar por user.id
    this.http.get<any>(url).subscribe(
      (response) => {       
        this.persona = response;
      },
      (error) => {
        console.log('Error al obtener las áreas');
        this.error = `Error al obtener las áreas`;
      } 
    );
    
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
        console.log('obtenidos');
       //obtener documento del usuario de sesion   
        this.listaCompleta = response.list;
        console.log('Lista Obtenida');
        for (const llamadoReg of this.listaCompleta) {
          for (const tribunal of llamadoReg.miembrosTribunal) {
            //en este fi se debe comparar con el documento de la persona obtener los llamado
            if(tribunal.persona.documento == this.docuemento){
              this.llamadoData.push(llamadoReg);
              this.postulanteData.push(tribunal);
              console.log(tribunal.persona.primerNombre);
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

  entrevistaRealizada(){
    const requestBody = {
      entrevistaRealizada: true,
      llamadoId: 0,
      personaId: 0,
      persona: {}
    };
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
