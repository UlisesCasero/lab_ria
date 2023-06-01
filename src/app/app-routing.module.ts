import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarTipoDocumentoComponent } from './buscar-tipo-documento/buscar-tipo-documento.component';
import { AltaTipoDocumentoComponent } from './alta-tipo-documento/alta-tipo-documento.component';
import { ModificarTipoDocumentoComponent } from './modificar-tipo-documento/modificar-tipo-documento.component';
import { AltaAreasComponent } from './alta-areas/alta-areas.component';

const routes: Routes = [
  { 
    path: 'buscar-documento', 
    component: BuscarTipoDocumentoComponent 
  },
  { 
    path: 'alta-documento', 
    component: AltaTipoDocumentoComponent 
  },
  { 
    path: 'modificar-documento', 
    component: ModificarTipoDocumentoComponent 
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
