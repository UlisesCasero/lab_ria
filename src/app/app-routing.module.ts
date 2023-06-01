import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarTipoDocumentoComponent } from './buscar-tipo-documento/buscar-tipo-documento.component';
import { AltaTipoDocumentoComponent } from './alta-tipo-documento/alta-tipo-documento.component';
import { AltaAreasComponent } from './alta-areas/alta-areas.component';

const routes: Routes = [
  { 
    path: 'buscar-documento', 
    component: BuscarTipoDocumentoComponent 
  },
  { 
    path: 'alta-docmento', 
    component: AltaTipoDocumentoComponent 
  },
  { 
    path: 'alta-areas', 
    component: AltaAreasComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
