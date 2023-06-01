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
