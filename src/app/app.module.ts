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

@NgModule({
  declarations: [
    AppComponent,    
    AltaTipoDocumentoComponent,
    ModificarTipoDocumentoComponent,
    BuscarTipoDocumentoComponent,
    EliminarTipoDocumentoComponent
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
