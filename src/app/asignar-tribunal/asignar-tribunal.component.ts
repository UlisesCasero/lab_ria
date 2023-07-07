import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-tribunal',
  templateUrl: './asignar-tribunal.component.html',
  styleUrls: ['./asignar-tribunal.component.scss']
})
export class AsignarTribunalComponent {

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  llamadoId: number = 0;
  llamado: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.llamadoId = params['llamadoId'];
      console.log("El llamado recibido es: " + this.llamadoId);
    });
    
    this.obtenerTribunal();
    this.obtenerUsuariosTribunal();
    this.obtenerTiposIntegrantes();
  }

  listaUsuarios: any[] = [];

  tribunalMiembro: any
  tribunal: number = 0;

  usuariosTribunal: any[] = [];

  setTribunal: any[] = [];
  tipoOrden: number = 0;
  error: String = '';
  miembroNuevo: any;

  

  // Tipos integrantes
  tiposIntegrantes: any[] = [];
  tipoIntegrante: any;
  maxIntegrantes: number = 0;
  cantActualMimebros: number = 0;

  obtenerTribunal() {
    const url = `http://localhost:5000/api/Llamados/${this.llamadoId}`;
    this.http.get<any>(url).subscribe(
      response => {
        this.llamado = response;
        this.setTribunal = this.llamado.miembrosTribunal;
      },
      error => {
        console.log('Hubo un error');
      },
    );

  }

  obtenerUsuariosTribunal() {
    console.log("obtien usuarios");
    const url = `http://localhost:5000/api/Auth/Users`;
    const requestBody = {
      limit: 22,
      offset: 0,
      id: 0,
      filters: {},
      orders: [""]
    };
    //console.log("obtien request body");
    this.http.post<any>(url, requestBody).subscribe(
      (response) => {
        //console.log("obtien response");
        this.listaUsuarios = response.list;
        //console.log(this.listaUsuarios.length);
        this.obtenerTribunal();
        for (const registro of this.listaUsuarios) {
          if (registro.roles.includes("TRIBUNAL")) {         
            //console.log("Los roles en este registro son " + registro.roles);
            //console.log("Nombre " + registro.persona.primerNombre);
            const documento = registro.persona.documento;
            const coincidencia = this.setTribunal.find(item => item.persona.documento == documento);
            if (!coincidencia) {
              this.usuariosTribunal.push(registro);
            }
          }
        }

      },
      (error) => {
        //console.log('Error al obtener los usuarios:', error);
        this.error = 'Error al obtener los usuarios';
      }
    );
  }

  obtenerTiposIntegrantes() {
    console.log("obtien integrantes");
    const url = `http://localhost:5000/api/TiposDeIntegrantes/Paged`;
    const requestBody = {
      "limit": 22,
      "offset": 0,
      "filters": {},
      "orders": ['']
    };
    //console.log("obtien request body");
    this.http.post<any>(url, requestBody).subscribe(
      (response) => {
        this.tiposIntegrantes = response.list;
        this.maxIntegrantes = this.tiposIntegrantes.length * 3;
      },
      (error) => {
        //console.log('Error al obtener los usuarios:', error);
        this.error = 'Error al obtener los usuarios';
      }
    );
  }

  registrarMiembroTribunal(form: NgForm) {
    if (form.invalid || !form.value.tipoDeIntegranteId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos',
        timer: 2000,
        timerProgressBar: true
      });
      return;
    }
    this.cantActualMimebros = this.setTribunal.length;
    if (this.cantActualMimebros == this.maxIntegrantes) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Maximo de integrantes alcanzado',
        timer: 2000,
        timerProgressBar: true
      });
      return;
    }
    
    const url = `http://localhost:5000/api/MiembrosTribunales`;
    const requestBody = {
      activo: true,
      orden: form.value.tipoOrden,
      renuncia: false,
      motivoRenuncia: "",
      llamadoId: this.llamadoId,
      personaId: form.value.personaId,
      tipoDeIntegranteId: form.value.tipoDeIntegranteId,
    };
    this.http.post<any>(url, requestBody).subscribe(
      response => {
        this.obtenerUsuariosTribunal();
        this.ordenarTribunal();       
        this.cantActualMimebros++;
        location.reload();
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error,
          timer: 2000,
          timerProgressBar: true
        });
      },
    );
  }

  ordenarTribunal() {
    this.setTribunal.sort((a, b) => {

      if (a.orden < b.orden) {
        return -1;
      } else if (a.orden > b.orden) {
        return 1;
      } else {
        return a.tipoDeIntegrante.orden - b.tipoDeIntegrante.orden;
      }
    });
  }
  cancelar() {
    this.router.navigate(['/listar-llamados']);
  }
}
