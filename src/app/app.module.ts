import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuscarDocmentoComponent } from './buscar-docmento/buscar-docmento.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AltaTipoDocumentoComponent } from './alta-tipo-documento/alta-tipo-documento.component';
import { ModificarTipoDocumentoComponent } from './modificar-tipo-documento/modificar-tipo-documento.component';
import { ListarTipoDocumentoComponent } from './listar-tipo-documento/listar-tipo-documento.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscarDocmentoComponent,
    AltaTipoDocumentoComponent,
    ModificarTipoDocumentoComponent,
    ListarTipoDocumentoComponent
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
