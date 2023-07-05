import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-listar-llamados',
  templateUrl: './listar-llamados.component.html',
  styleUrls: ['./listar-llamados.component.scss']
})
export class ListarLlamadosComponent {
  llamadoData: any[] = []; 
  llamadoPaginated: any[] = [];
  llamado: any;

  estado: any;
  estadoId: number = 0;
  estadosPosibles: any[] = [];


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
    this.obtenerLlamados();
    this.obtenerEstados();
  }

  altaLlamado() {
    this.router.navigate(['alta-llamado']);
  }

  listarPostulantes(llamadoId: number) {
    this.router.navigate(['postulantes-a-llamado', llamadoId]);
  }
  
  obtenerLlamados() {
    const url = 'http://localhost:5000/api/llamados/Paged';
    const Body = {
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

    this.http.post<any>(url, Body).subscribe(
      (response) => {       
        console.log('obtenidos');   
        this.llamadoData = response.list;
        this.totalItems = response.totalCount;
        this.actualizarDatosPaginados();
      },
      (error) => {
        console.log('Error al obtener las áreas');
        this.error = `Error al obtener las áreas`;
      } 
    );
  }

  modificarEstado(nuevoEstado: string,llamado: any) {
    const url = `http://localhost:5000/api/Llamados/${llamado.id}`;
    const body = {
      "id": llamado.id,
      "activo": false,
      "identificador": llamado.identificador,
      "nombre": llamado.nombre,
      "linkPlanillaPuntajes": llamado.linkPlanillaPuntajes,
      "linkActa": llamado.linkActa,
      "minutosEntrevista": llamado.minutosEntrevista,
      "areaId": llamado.areaId,
      "area": {
        "id": llamado.area.id,
        "activo": llamado.area.activo,
        "nombre": llamado.area.nombre
      }
    };
    if(nuevoEstado == "activar"){
      body.activo = true;
    }
    
    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Área:', response);   
        llamado = response;
        location.reload();  
      },
      (error) => {
        console.log('Error al eliminar el área:', error);
        this.error = `Error al eliminar el área`;
      }
    );
  }

  modificarLlamado(llamado: any) {
    const url = `http://localhost:5000/api/Llamados/${llamado.id}`;
    const body = {
      "id": llamado.id,
      "activo": llamado.activo,
      "identificador": llamado.identificador,
      "nombre": llamado.nombre,
      "linkPlanillaPuntajes": llamado.linkPlanillaPuntajes,
      "linkActa": llamado.linkActa,
      "minutosEntrevista": llamado.minutosEntrevista,
      "areaId": llamado.areaId,
      "area": {
        "id": llamado.area.id,
        "activo": llamado.area.activo,
        "nombre": llamado.area.nombre
      }
    };

    this.http.put<any>(url, body).subscribe(
      (response) => {       
        console.log('Llamado:', response);   
        llamado = response;
        this.router.navigate(['modificar-llamado', llamado.id]); 
      },
      (error) => {
        console.log('Error al modificar el Llamado:', error);
        this.error = `Error al modificar el Llamado`;
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
        this.estado = response; // Asignar el resultado a la variable estado
      },
      (error) => {
        console.log('Error al obtener el estado:', error);
      }
    );
  }

  // Modificar Estado del llamado
  abrirVentanaAsignarEstadoLlamado(llamado: any) {
    Swal.fire({
      title: 'Asignar Estado',
      html: '<select id="selectEstado" class="swal2-input"></select>',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      didOpen: () => {
        // En este evento "didOpen", se ejecuta cuando la ventana emergente está abierta.
        // Aquí agregamos las opciones al select en base a la lista de estadosPosibles cargada previamente.
        const select = document.getElementById('selectEstado') as HTMLSelectElement;
        this.estadosPosibles.forEach((opcion) => {
          const option = document.createElement('option');
          option.value = opcion.id; // Cargar la propiedad "nombre" del objeto como valor de la opción
          option.text = opcion.nombre; // Cargar la propiedad "nombre" del objeto como texto de la opción
          select.add(option);
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
        location.reload();
      }
    });
  }

  // Modificar Estado del llamado
  abrirVentanaAsignarEstadoLlamado(llamado: any) {
    Swal.fire({
      title: 'Asignar Estado',
      html: '<select id="selectEstado" class="swal2-input"></select>',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      didOpen: () => {
        const select = document.getElementById('selectEstado') as HTMLSelectElement;
        this.estadosPosibles.forEach((opcion) => {
          const option = document.createElement('option');
          option.value = opcion.id;
          option.text = opcion.nombre;
          select.add(option);
        });
      },
      preConfirm: () => {
        const select = document.getElementById('selectEstado') as HTMLSelectElement;
        const selectedOption = select.value;
        const estadoNumero = parseInt(selectedOption, 10);
        this.estadoId = estadoNumero;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.asignarEstadoLlamado(llamado);
        console.log('Guardado');
        location.reload();
      }
    });
  }

  asignarEstadoLlamado(llamado: any) {
    const fechaHoraActual = new Date().toISOString();
    const url = `http://localhost:5000/api/LlamadosEstados`;
    const requestBody = {
        "id": 0,
        "activo": true,
        "fechaHora": fechaHoraActual,
        "usuarioTransicion": "",
        "observacion": "",
        "llamadoId": llamado.id,
        "llamadoEstadoPosibleId": this.estado, // Conseguir el estado id
    };

    this.http.post<any>(url, requestBody).subscribe(
      response => {
        if (response.statusOk) {
          console.log('Lo logró');
        } else {
          console.log('No lo logró');
        }
      },
      error => {
        console.log('Hubo un error');
      }
    );
  }
 // Termiona Modificar Estado del llamado

// Asignar Postulante

asignarPostulante(llamadoId: number){
  this.router.navigate(['agregar-postulante', llamadoId]);
}

//

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