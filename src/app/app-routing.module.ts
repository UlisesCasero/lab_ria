import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarDocmentoComponent } from './buscar-docmento/buscar-docmento.component';
import { AltaTipoDocumentoComponent } from './alta-tipo-documento/alta-tipo-documento.component';

const routes: Routes = [
  { 
    path: 'buscar-docmento', 
    component: BuscarDocmentoComponent 
  },
  { 
    path: 'alta-docmento', 
    component: AltaTipoDocumentoComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
