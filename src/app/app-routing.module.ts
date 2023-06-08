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
import { ListarTipoDocumentosComponent } from './listar-tipo-documentos/listar-tipo-documentos.component';
import { ModificarAreasComponent } from './modificar-areas/modificar-areas.component';
import { ModificarLlamadosEstadosPosiblesComponent } from './modificar-llamados-estados-posibles/modificar-llamados-estados-posibles.component';
import { EliminarAreasComponent } from './eliminar-areas/eliminar-areas.component';
import { EliminarLlamadosEstadosPosiblesComponent } from './eliminar-llamados-estados-posibles/eliminar-llamados-estados-posibles.component';
import { LoginIniciarSesionComponent } from './login-iniciar-sesion/login-iniciar-sesion.component';
import { AltaTipoDeIntegrantesComponent } from './alta-tipo-de-integrantes/alta-tipo-de-integrantes.component';
import { BuscarTipoDeIntegrantesComponent } from './buscar-tipo-de-integrantes/buscar-tipo-de-integrantes.component';
import { ListarLlamadosEstadosPosiblesComponent } from './listar-llamados-estados-posibles/listar-llamados-estados-posibles.component';
import { ListarAreasComponent } from './listar-areas/listar-areas.component';


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
  },
  { 
    path: 'listar-documentos', 
    component: ListarTipoDocumentosComponent 
  },
  { 
    path: 'modificar-areas', 
    component: ModificarAreasComponent 
  },
  { 
    path: 'modificar-llamados-estados-posibles', 
    component: ModificarLlamadosEstadosPosiblesComponent 
  },
  { 
    path: 'eliminar-llamados-estados-posibles', 
    component: EliminarLlamadosEstadosPosiblesComponent 
  },
  { 
    path: 'eliminar-areas', 
    component: EliminarAreasComponent 
  },
  { 
    path: 'login-iniciar-sesion', 
    component: LoginIniciarSesionComponent 
  },
  { 
    path: 'alta-tipo-de-integrantes', 
    component: AltaTipoDeIntegrantesComponent 
  },
  { 
    path: 'buscar-tipo-de-integrantes', 
    component: BuscarTipoDeIntegrantesComponent 
  },
  { 
    path: 'listar-llamados-estados-posibles', 
    component: ListarLlamadosEstadosPosiblesComponent 
  },
  { 
    path: 'listar-areas', 
    component: ListarAreasComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
