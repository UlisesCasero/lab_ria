import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

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
  id= sessionStorage.getItem('id');

  estado: any;
  estadoId: number = 0;
  estadosPosibles: any[] = [];

  postulanteData: any[] = [];
  docuemento: string = sessionStorage.getItem('documento') || '';

  public error: String = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  searchTerm: string = '';

  constructor(private http: HttpClient, private router: Router, private location: Location) { }

  ngOnInit() {
    this.obtenerUsuario();
    this.obtenerEstados();
  }

  listarPostulantes(llamadoId: number) {
    this.router.navigate(['postulantes-a-llamado', llamadoId]);
  }

  obtenerUsuario(){
    const url = `http://localhost:5000/api/Personas/5`; 
    console.log('response');
    this.http.get<any>(url).subscribe(
      (response) => {       
        debugger
        this.obtenerLlamados();
        console.log('response');
        this.persona = response;
        console.log('persona', this.persona.primerNombre);
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

  asignarEstadoLlamado(llamado: any){    
    const fechaHoraActual = new Date().toISOString();
    const url = `http://localhost:5000/api/LlamadosEstados`;
    const requestBody = {
        "id": 0,
        "activo": true,
        "fechaHora": fechaHoraActual,
        "usuarioTransicion": "",
        "observacion": "",
        "llamadoId": llamado.id,
        "llamadoEstadoPosibleId": this.estado, 
    };
    this.http.post<any>(url, requestBody).subscribe(
      response => {
        if (response.statusOk) {
          console.log('Lo logró');
          location.reload(); 
        } else {
          location.reload(); 
          console.log('No lo logró');
        }
      },
      error => {
        console.log('Hubo un error');
      }
    );
  }

  obtenerEstados(){
    const url = 'http://localhost:5000/api/LlamadosEstadosPosibles/Paged';
    const Body = {
      limit: -1,
      offset: 0,
      id: 0,
      filters: {
        activo: true,
        nombre: ""
      },
      orders: [ "" ]
    };

    this.http.post<any>(url, Body).subscribe(
      (response) => {          
        this.estadosPosibles = response.list;
      },
      (error) => {
        console.log('Error al obtener las áreas');
        this.error = `Error al obtener las áreas`;
      } 
    );
  }

  obtenerEstado(idEstado: number) {
    const url = `http://localhost:5000/api/LlamadosEstadosPosibles/${idEstado}`;

    return this.http.get<any>(url).subscribe(
      (response) => {
        this.estado = response; 
      },
      (error) => {
        console.log('Error al obtener el estado:', error);
      }
    );
  }

  abrirVentanaAsignarEstadoLlamado(llamado: any) {
    const rolesString = sessionStorage.getItem('roles');
  
    if (rolesString) {
      const userRoles = JSON.parse(rolesString);
  
      if (userRoles.includes('ADMIN')) {
        Swal.fire({
          title: 'Asignar Estado',
          html: '<select id="selectEstado" class="swal2-input"></select>',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Guardar',
          didOpen: () => {
            const select = document.getElementById('selectEstado') as HTMLSelectElement;
            this.estadosPosibles.forEach((opcion) => {
              if (opcion.id === 1  || opcion.id === 4 || opcion.id === 5 ) {
                const option = document.createElement('option');
                option.value = opcion.id.toString();
                option.text = opcion.nombre;
                select.add(option);
              }
            });
          },
          preConfirm: () => {
            const select = document.getElementById('selectEstado') as HTMLSelectElement;
            const selectedOption = select.value;
            const estadoNumero = parseInt(selectedOption, 10); 
            this.estado = estadoNumero;
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.asignarEstadoLlamado(llamado);
            console.log('Guardado');
          }
        });
      }else if(userRoles.includes('TRIBUNAL')) {
        Swal.fire({
          title: 'Asignar Estado',
          html: '<select id="selectEstado" class="swal2-input"></select>',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Guardar',
          didOpen: () => {
            const select = document.getElementById('selectEstado') as HTMLSelectElement;
            this.estadosPosibles.forEach((opcion) => {
              if (opcion.id === 2 || opcion.id === 3) {
                const option = document.createElement('option');
                option.value = opcion.id.toString();
                option.text = opcion.nombre;
                select.add(option);
              }
            });
          },
          preConfirm: () => {
            const select = document.getElementById('selectEstado') as HTMLSelectElement;
            const selectedOption = select.value;
            const estadoNumero = parseInt(selectedOption, 10); // Convertir la cadena de texto a número
            this.estado = estadoNumero;
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.asignarEstadoLlamado(llamado);
            console.log('Guardado');
          }
        });
      }
    } else {
      console.log('No se encontraron roles en sessionStorage');
    }
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
