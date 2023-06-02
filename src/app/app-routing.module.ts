import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarTipoDocumentoComponent } from './buscar-tipo-documento/buscar-tipo-documento.component';
import { AltaTipoDocumentoComponent } from './alta-tipo-documento/alta-tipo-documento.component';
import { ModificarTipoDocumentoComponent } from './modificar-tipo-documento/modificar-tipo-documento.component';
import { AltaAreasComponent } from './alta-areas/alta-areas.component';
import { EliminarTipoDocumentoComponent } from './eliminar-tipo-documento/eliminar-tipo-documento.component';
import { BuscarAreasComponent } from './buscar-areas/buscar-areas.component';
import { BuscarLlamadosEstadosPosiblesComponent } from './buscar-llamados-estados-posibles/buscar-llamados-estados-posibles.component';
import { AltaLlamadosEstadosPosiblesComponent } from './alta-llamados-estados-posibles/alta-llamados-estados-posibles.component';

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
    path: 'eliminar-documento', 
    component: EliminarTipoDocumentoComponent 
  },
  {
    path: 'alta-areas', 
    component: AltaAreasComponent 
  },
  { 
    path: 'alta-llamados-estados-posibles', 
    component: AltaLlamadosEstadosPosiblesComponent 
  },
  { 
    path: 'buscar-areas', 
    component: BuscarAreasComponent 
  },
  { 
    path: 'buscar-llamados-estados-posibles', 
    component: BuscarLlamadosEstadosPosiblesComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
