import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AltaTipoDocumentoComponent } from './alta-tipo-documento/alta-tipo-documento.component';
import { ModificarTipoDocumentoComponent } from './modificar-tipo-documento/modificar-tipo-documento.component';
import { BuscarTipoDocumentoComponent } from './buscar-tipo-documento/buscar-tipo-documento.component';
import { BuscarAreasComponent } from './buscar-areas/buscar-areas.component';
import { AltaAreasComponent } from './alta-areas/alta-areas.component';
import { AltaLlamadosEstadosPosiblesComponent } from './alta-llamados-estados-posibles/alta-llamados-estados-posibles.component';
import { BuscarLlamadosEstadosPosiblesComponent } from './buscar-llamados-estados-posibles/buscar-llamados-estados-posibles.component';
import { ListarTipoDocumentosComponent } from './listar-tipo-documentos/listar-tipo-documentos.component';
import { ModificarAreasComponent } from './modificar-areas/modificar-areas.component';
import { ModificarLlamadosEstadosPosiblesComponent } from './modificar-llamados-estados-posibles/modificar-llamados-estados-posibles.component';
import { EliminarAreasComponent } from './eliminar-areas/eliminar-areas.component';
import { EliminarLlamadosEstadosPosiblesComponent } from './eliminar-llamados-estados-posibles/eliminar-llamados-estados-posibles.component';
import { ListarLlamadosEstadosPosiblesComponent } from './listar-llamados-estados-posibles/listar-llamados-estados-posibles.component';
import { ListarAreasComponent } from './listar-areas/listar-areas.component';
import { AltaTipoDeIntegrantesComponent } from './alta-tipo-de-integrantes/alta-tipo-de-integrantes.component';
import { BuscarTipoDeIntegrantesComponent } from './buscar-tipo-de-integrantes/buscar-tipo-de-integrantes.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { ListarTipoDeIntegrantesComponent } from './listar-tipo-de-integrantes/listar-tipo-de-integrantes.component';
import { AltaLlamadosComponent } from './alta-llamados/alta-llamados.component';
import { ListarLlamadosComponent } from './listar-llamados/listar-llamados.component';
import { ModificarTipoDeIntegrantesComponent } from './modificar-tipo-de-integrantes/modificar-tipo-de-integrantes.component';
import { EliminarLlamadoComponent } from './eliminar-llamado/eliminar-llamado.component';
import { ModificarLlamadoComponent } from './modificar-llamado/modificar-llamado.component';
import { AltaUsuarioComponent } from './alta-usuario/alta-usuario.component';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { ModificarUsuarioComponent } from './modificar-usuario/modificar-usuario.component';


@NgModule({
  declarations: [
    AppComponent,    
    AltaTipoDocumentoComponent,
    ModificarTipoDocumentoComponent,
    BuscarTipoDocumentoComponent,        
    BuscarAreasComponent,
    AltaAreasComponent,
    AltaLlamadosEstadosPosiblesComponent,
    BuscarLlamadosEstadosPosiblesComponent,
    ListarTipoDocumentosComponent,
    ModificarAreasComponent,
    ModificarLlamadosEstadosPosiblesComponent,
    EliminarAreasComponent,
    EliminarLlamadosEstadosPosiblesComponent,
    ListarLlamadosEstadosPosiblesComponent,
    ListarAreasComponent,
    AltaTipoDeIntegrantesComponent,
    BuscarTipoDeIntegrantesComponent,
    LoginComponent,
    ListarTipoDeIntegrantesComponent,
    AltaLlamadosComponent,
    ListarLlamadosComponent,
    ModificarLlamadoComponent,
    EliminarLlamadoComponent,
    ModificarTipoDeIntegrantesComponent,
    AltaUsuarioComponent,
    ListarUsuariosComponent,
    ModificarUsuarioComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class BuscarDocmentoModule { }
