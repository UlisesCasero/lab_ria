import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eliminar-tipo-documento',
  templateUrl: './eliminar-tipo-documento.component.html',
  styleUrls: ['./eliminar-tipo-documento.component.scss']
})
export class EliminarTipoDocumentoComponent {
  
  
  constructor(private http: HttpClient) { }
}
