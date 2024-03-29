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
import { AltaUsuarioComponent } from './alta-usuario/alta-usuario.component';
import { AltaLlamadosComponent } from './alta-llamados/alta-llamados.component';
import { ListarLlamadosComponent } from './listar-llamados/listar-llamados.component';
import { ModificarLlamadoComponent } from './modificar-llamado/modificar-llamado.component';
import { ModificarTipoDeIntegrantesComponent } from './modificar-tipo-de-integrantes/modificar-tipo-de-integrantes.component';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { ModificarUsuarioComponent } from './modificar-usuario/modificar-usuario.component';
import { PostulanteLlamadoComponent } from './postulante-llamado/postulante-llamado.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PostulantesALlamadoComponent } from './postulantes-allamado/postulantes-allamado.component';
import { ListarTiposDeIntegrantesComponent } from './listar-tipos-de-integrantes/listar-tipos-de-integrantes.component';
import { AltaTipoDeIntegranteComponent } from './alta-tipo-de-integrante/alta-tipo-de-integrante.component';
import { AsignarTribunalComponent } from './asignar-tribunal/asignar-tribunal.component';
import { AltaResponsabilidadesComponent } from './alta-responsabilidades/alta-responsabilidades.component';
import { ListarResponsabilidadesComponent } from './listar-responsabilidades/listar-responsabilidades.component';
import { ModificarResponsabilidadesComponent } from './modificar-responsabilidades/modificar-responsabilidades.component';
import { ListaLlamadosUsuarioComponent } from './lista-llamados-usuario/lista-llamados-usuario.component';
import { ListaLlamadosTribunalComponent } from './lista-llamados-tribunal/lista-llamados-tribunal.component';
import { AltaPersonaComponent } from './alta-persona/alta-persona.component';
import { ListarPersonasComponent } from './listar-personas/listar-personas.component';
import { ModificarPersonaComponent } from './modificar-persona/modificar-persona.component';
import { AltaPersonaLlamadoComponent } from './alta-persona-llamado/alta-persona-llamado.component';

const routes: Routes = [
  {
    path: 'alta-usuario', 
    component: AltaUsuarioComponent 
  },
  {
    path: 'alta-responsabilidades', 
    component: AltaResponsabilidadesComponent 
  },
  {
    path: 'alta-llamado', 
    component: AltaLlamadosComponent 
  },
  { 
    path: 'buscar-documento', 
    component: BuscarTipoDocumentoComponent 
  }, { 
    path: 'modificar-responsabilidades', 
    component: ModificarResponsabilidadesComponent 
  },{ 
    path: 'modificar-responsabilidades/:id', 
    component: ModificarResponsabilidadesComponent 
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
    path: 'listar-responsabilidades', 
    component: ListarResponsabilidadesComponent 
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
    path: 'listar-usuarios', 
    component: ListarUsuariosComponent 
  },
  { 
    path: 'modificar-usuario/:id', 
    component: ModificarUsuarioComponent 
  },
  { 
    path: 'agregar-postulante/:llamadoId', 
    component: PostulanteLlamadoComponent 
  },
  {  path: 'login/restore-password', 
    component: RestorePasswordComponent 
  },
  { 
    path: 'login/forgot-password', 
    component: RestorePasswordComponent 
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },
  {
    path: 'postulantes-a-llamado/:llamadoId', 
    component: PostulantesALlamadoComponent
  },
  {
    path: 'listar-tipos-de-integrantes', 
    component: ListarTiposDeIntegrantesComponent
  },
  {
    path: 'alta-tipo-integrante', 
    component: AltaTipoDeIntegranteComponent
  },
  {
    path: 'asignar-tribunal/:llamadoId', 
    component: AsignarTribunalComponent
  },
  {
    path: 'lista-llamados-usuario', 
    component: ListaLlamadosUsuarioComponent
  },
  {
    path: 'lista-llamados-tribunal', 
    component: ListaLlamadosTribunalComponent
  },
  {
    path: 'alta-persona', 
    component: AltaPersonaComponent
  },
  {
    path: 'listar-personas', 
    component: ListarPersonasComponent
  },
  {
    path: 'modificar-persona/:personaId', 
    component: ModificarPersonaComponent
  },
  {
    path: 'alta-persona-llamado/:llamadoId', 
    component: AltaPersonaLlamadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
