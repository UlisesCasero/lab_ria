import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AltaTipoDocumentoComponent } from './alta-tipo-documento/alta-tipo-documento.component';
import { ModificarTipoDocumentoComponent } from './modificar-tipo-documento/modificar-tipo-documento.component';
import { BuscarTipoDocumentoComponent } from './buscar-tipo-documento/buscar-tipo-documento.component';
import { EliminarTipoDocumentoComponent } from './eliminar-tipo-documento/eliminar-tipo-documento.component';
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
import { LoginIniciarSesionComponent } from './login-iniciar-sesion/login-iniciar-sesion.component';
import { AltaTipoDeIntegrantesComponent } from './alta-tipo-de-integrantes/alta-tipo-de-integrantes.component';
import { BuscarTipoDeIntegrantesComponent } from './buscar-tipo-de-integrantes/buscar-tipo-de-integrantes.component';


@NgModule({
  declarations: [
    AppComponent,    
    AltaTipoDocumentoComponent,
    ModificarTipoDocumentoComponent,
    BuscarTipoDocumentoComponent,
    EliminarTipoDocumentoComponent,        
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
    LoginIniciarSesionComponent,
    AltaTipoDeIntegrantesComponent,
    BuscarTipoDeIntegrantesComponent,    
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class BuscarDocmentoModule { }
