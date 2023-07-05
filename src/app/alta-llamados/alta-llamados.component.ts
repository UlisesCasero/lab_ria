import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-llamados',
  templateUrl: './alta-llamados.component.html',
  styleUrls: ['./alta-llamados.component.scss']
})

export class AltaLlamadosComponent {
  ngOnInit(){
    this.obtenerAreas();
    this.obtenerUsuariosTribunal();
   }
  
  llamado: any = [];
  areas: any[] = [];
  area: any = [];
  public error: String = '';

  tribunal: number = 0;
  listaUsuarios: any[] = [];
  usuariosTribunal: any[] = [];
  cantTribunal: number = 0;
  Ids: any[] = [];
  setTribunal: any[] = [];

  constructor(private http: HttpClient) { }

  obtenerAreas() {
    const url = 'http://localhost:5000/api/Areas/Paged';
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
        this.areas = response.list;
      },
      (error) => {
        console.log('Error al obtener los documents');
      } 
    );
  }

  obtenerUsuariosTribunal() {
    console.log("obtien usuarios");
    const url = 'http://localhost:5000/api/Auth/Users';
    const filters = {
      
    };
    const requestBody = {
        limit: 22,
        offset: 0,
        id: 0,
        filters: {},
        orders: [""]
    };
    console.log("obtien request body");
    this.http.post<any>(url, requestBody).subscribe(
      (response) => {  
        console.log("obtien response");
        this.listaUsuarios =  response.list;
        console.log(this.listaUsuarios.length);
        for (const registro of  this.listaUsuarios) {
          if(registro.roles.includes("TRIBUNAL")){
            console.log("Los roles en este registro son " + registro.roles);
            this.usuariosTribunal.push(registro);
            this.tribunal++;
          }
        }
        this.cantTribunal = this.usuariosTribunal.length;
      },
      (error) => {
        console.log('Error al obtener los usuarios:', error);
        this.error = 'Error al obtener los usuarios';
      }
    );
  }

  abrirVentanaAsignarTribunal() {
    Swal.fire({
      title: 'Asignar Tribunal',
      html: '<div id="checkboxGroup"></div>',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      didOpen: () => {
        const checkboxGroup = document.getElementById('checkboxGroup')!;
        let seleccionadas: HTMLInputElement[] = [];
        
        // Crear y agregar checkboxes para cada opción de usuariosTribunal
        this.usuariosTribunal.forEach((opcion) => {
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.name = 'tribunalOption';
          checkbox.value = opcion.persona.id.toString();
          checkbox.id = `checkbox_${opcion.persona.id}`;
  
          // Escuchar el evento 'change' para contar las opciones seleccionadas
          checkbox.addEventListener('change', () => {
            seleccionadas = Array.from(document.querySelectorAll('input[name="tribunalOption"]:checked')) as HTMLInputElement[];
  
            // Si se seleccionan más de 3 opciones, deshabilitar los checkboxes restantes
            if (seleccionadas.length >= 3) {
              document.querySelectorAll('input[name="tribunalOption"]:not(:checked)').forEach((checkboxNoSeleccionado) => {
                (checkboxNoSeleccionado as HTMLInputElement).disabled = true;
              });
            } else {
              // Habilitar todos los checkboxes si se deseleccionan opciones
              document.querySelectorAll('input[name="tribunalOption"]').forEach((checkbox) => {
                (checkbox as HTMLInputElement).disabled = false;
              });
            }
          });
  
          const label = document.createElement('label');
          label.textContent = opcion.persona.primerNombre + " " + opcion.persona.primerApellido;
          label.setAttribute('for', `checkbox_${opcion.persona.id}`);
          checkboxGroup.appendChild(checkbox);
          checkboxGroup.appendChild(label);
          checkboxGroup.appendChild(document.createElement('br'));
        });
      },
      preConfirm: () => {
        const selectedCheckboxes = Array.from(document.querySelectorAll('input[name="tribunalOption"]:checked')) as HTMLInputElement[];
        const Ids = selectedCheckboxes.map((checkbox) => parseInt(checkbox.value, 10));
        for (const id of Ids) {
          this.setTribunal.push(this.usuariosTribunal.find((opcion) => opcion.persona.id === id));
        }
        
      }
    }).then((result) => {
      if (result.isConfirmed) {  
        
        
          for (const per of this.setTribunal) {
            console.log(per.persona.id);
          }   
      }
    });
  }

  buscarArea(area: number) {
    const url = 'http://localhost:5000/api/Areas/' + area;

    return this.http.get<any>(url);
  }

  registrarLlamado(form: NgForm){
    if (form.valid) {
      const url = 'http://localhost:5000/api/Llamados';
      const requestBody = {
        id: 0,
        activo: true,
        identificador: form.value.identificador,
        nombre: form.value.nombre,
        linkPlanillaPuntajes: form.value.linkPLanillaPuntajes,
        linkActa: form.value.linkActa,
        minutosEntrevista: form.value.minutosEntrevista,
        areaId: form.value.idArea,
        area: null,
        postulantes: [],
        miembrosTribunal: [],
        llamadoEstados: [],// todo estado por el que paso
        ultimoEstado: null // estado actual 
      };

      this.buscarArea(form.value.idArea).subscribe(
        (areaRespuesta) => {
          requestBody.area = areaRespuesta; // Asigna el resultado de buscarArea al campo 'area' en requestBody
  
          this.http.post<any>(url, requestBody).subscribe(
            response => {
              console.log("LLEGA HASTA ACAAAAAAAAAA");
              this.llamado = response;
              for (const miembro of this.setTribunal) {
                console.log(miembro.persona.primerNombre);
              }
              console.log("NO LLEGA HASTA ACAAAAAAAAAA");
              this.asignarTribunal(this.llamado);
              console.log("Y TAMPOOCO LLEGA HASTA ACAAAAAAAAAA");
            },
            error => {
              console.log('Hubo un error');
            }
          );
        },
        (error) => {
          console.log('Error al obtener el área:', error);
        }
      );
    }
  }

  //TENGO QUE REGISTRAR EL TIPO DE INTEGRANTE CREO QUE ES SUPLENTE TITULAR Y DEMAS,
  // PROBAR ESO LUEGO DE QUE SE TIENE EL TIPO DE INTTEGRANTE ESO SE ASIGNA AL MIAMBRO DEL TRIBUNAL Y AHI SE PUEDE ASIGNAR MIEBRO DE TRIBUNAL AL LLAMADO
  tipoIntegrante(){

  }

  asignarTribunal(llamado: any){
    for (const miembro of this.setTribunal) {

      console.log("asignando Tribunal a llamado " + llamado.nombre);
      const url = `http://localhost:5000/api/Llamados/${llamado.id}`;
      const requestBody = {
        id: 0,
        activo: true,
        orden: 1,
        renuncia: false,
        motivoRenuncia: null,
        llamadoId: llamado.id,
        personaId: miembro.persona.id,
        tipoDeIntegranteId: 1,
      };

      console.log("obtien request body");
      this.http.post<any>(url, requestBody).subscribe(
        (response) => {  
          console.log("obtien response");
          this.listaUsuarios =  response.list;
          console.log(this.listaUsuarios.length);
          for (const registro of  this.listaUsuarios) {
            if(registro.roles.includes("TRIBUNAL")){
              console.log("Los roles en este registro son " + registro.roles);
              this.usuariosTribunal.push(registro);
              this.tribunal++;
            }
          }
          this.cantTribunal = this.usuariosTribunal.length;
        },
        (error) => {
          console.log('Error al obtener los usuarios:', error);
          this.error = 'Error al obtener los usuarios';
        }
      );
      
    }
  }

}
