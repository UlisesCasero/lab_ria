import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarDocmentoComponent } from './buscar-docmento/buscar-docmento.component';

const routes: Routes = [
  { path: 'buscar-docmento', component: BuscarDocmentoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
