import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarTipoDocumentoComponent } from './buscar-tipo-documento/buscar-tipo-documento.component';
import { AltaTipoDocumentoComponent } from './alta-tipo-documento/alta-tipo-documento.component';
import { ModificarTipoDocumentoComponent } from './modificar-tipo-documento/modificar-tipo-documento.component';
import { AltaAreasComponent } from './alta-areas/alta-areas.component';
import { BuscarAreasComponent } from './buscar-areas/buscar-areas.component';
import { BuscarLlamadosEstadosPosiblesComponent } from './buscar-llamados-estados-posibles/buscar-llamados-estados-posibles.component';
import { AltaLlamadosEstadosPosiblesComponent } from './alta-llamados-estados-posibles/alta-llamados-estados-posibles.component';
import { ListarTipoDocumentosComponent } from './listar-tipo-documentos/listar-tipo-documentos.component';
import { ModificarAreasComponent } from './modificar-areas/modificar-areas.component';
import { ModificarLlamadosEstadosPosiblesComponent } from './modificar-llamados-estados-posibles/modificar-llamados-estados-posibles.component';
import { EliminarAreasComponent } from './eliminar-areas/eliminar-areas.component';
import { EliminarLlamadosEstadosPosiblesComponent } from './eliminar-llamados-estados-posibles/eliminar-llamados-estados-posibles.component';
import { AltaTipoDeIntegrantesComponent } from './alta-tipo-de-integrantes/alta-tipo-de-integrantes.component';
import { BuscarTipoDeIntegrantesComponent } from './buscar-tipo-de-integrantes/buscar-tipo-de-integrantes.component';
import { ListarLlamadosEstadosPosiblesComponent } from './listar-llamados-estados-posibles/listar-llamados-estados-posibles.component';
import { ListarAreasComponent } from './listar-areas/listar-areas.component';
import { ListarTipoDeIntegrantesComponent } from './listar-tipo-de-integrantes/listar-tipo-de-integrantes.component';
import { LoginComponent } from './login/login.component';
import { AltaPersonaComponent } from './alta-persona/alta-persona.component';
import { AltaLlamadosComponent } from './alta-llamados/alta-llamados.component';
import { ListarLlamadosComponent } from './listar-llamados/listar-llamados.component';
import { ModificarLlamadoComponent } from './modificar-llamado/modificar-llamado.component';
import { ModificarTipoDeIntegrantesComponent } from './modificar-tipo-de-integrantes/modificar-tipo-de-integrantes.component';
import { ListarPersonasComponent } from './listar-personas/listar-personas.component';
import { ModificarPersonaComponent } from './modificar-persona/modificar-persona.component';


const routes: Routes = [
  {
    path: 'alta-persona', 
    component: AltaPersonaComponent 
  },
  {
    path: 'alta-llamado', 
    component: AltaLlamadosComponent 
  },
  { 
    path: 'buscar-documento', 
    component: BuscarTipoDocumentoComponent 
  },
  { 
    path: 'alta-documento', 
    component: AltaTipoDocumentoComponent 
  },
  { 
    path: 'modificar-documento/:id', 
    component: ModificarTipoDocumentoComponent 
  },
  { 
    path: 'modificar-tipo-de-integrantes/:id', 
    component: ModificarTipoDeIntegrantesComponent 
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
    path: 'modificar-area/:id', 
    component: ModificarAreasComponent 
  },
  { 
    path: 'modificar-llamados-estados-posibles/:id', 
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
    path: 'login-sesion', 
    component: LoginComponent 
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
  },
  { 
    path: 'listar-tipo-de-integrantes', 
    component: ListarTipoDeIntegrantesComponent 
  },
  { 
    path: 'listar-llamados', 
    component: ListarLlamadosComponent 
  },
  { 
    path: 'modificar-llamado/:id', 
    component: ModificarLlamadoComponent 
  },
  { 
    path: 'listar-personas', 
    component: ListarPersonasComponent 
  },
  { 
    path: 'modificar-persona/:id', 
    component: ModificarPersonaComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
