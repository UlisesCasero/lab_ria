import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss']
})
export class ModificarUsuarioComponent implements OnInit {
  usuario: any;
  documentos: any[] = [];
  documentoId: string = '';
  error: string = '';
  errorCamposRequeridos: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      this.usuario = JSON.parse(params['usuario']);
    });
    this.obtenerDocumentos();
  }

  obtenerDocumentos() {
    const url = 'http://localhost:5000/api/TiposDeDocumentos/Paged';
    const body = {
      "limit": -1,
      "offset": 0,
      "id": 0,
      "filters": {
        "activo": true,
        "nombre": ""
      },
      "orders": [""]
    };

    this.http.post<any>(url, body).subscribe(
      (response) => {
        this.documentos = response.list;
      },
      (error) => {
        console.log('Error al obtener los documentos');
      }
    );
  }

  modificarUsuario(usuario: any) {
    if (!usuario.persona.primerNombre || !usuario.persona.primerApellido || !this.documentoId) {
      this.errorCamposRequeridos = 'Debe completar los campos requeridos.';
      return;
    }
    const url = `http://localhost:5000/api/Personas/${usuario.persona.id}`;
    const body = {
      id: usuario.persona.id,
      activo: usuario.persona.activo,
      tipoDeDocumento: {
        id: this.documentoId,
        activo: usuario.persona.tipoDeDocumento.activo,
        nombre: usuario.persona.tipoDeDocumento.nombre
      },
      documento: usuario.persona.documento,
      primerNombre: usuario.persona.primerNombre,
      segundoNombre: usuario.persona.segundoNombre,
      primerApellido: usuario.persona.primerApellido,
      segundoApellido: usuario.persona.segundoApellido
    };
  
    this.http.put<any>(url, body).subscribe(
      (response) => {
        this.usuario = response;
        this.router.navigate(['modificar-usuario', usuario.persona.id, { usuario: JSON.stringify(usuario) }]);
        console.log('Persona:', response);
        this.router.navigate(['listar-usuarios']);
      },
      (error) => {
        console.log('Error al modificar la Persona:', error);
        this.error = `Error al modificar la Persona`;
        console.log('Detalles del error:', error.error);
      }
    );
  }
  
  onDocumentoChange(event: any) {
    console.log('Documento seleccionado:', this.documentoId);
  }
  cancelar() {
    this.router.navigate(['listar-usuarios']); 
  }
  
}
