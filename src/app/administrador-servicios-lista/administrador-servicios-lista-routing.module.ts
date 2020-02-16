import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorServiciosListaPage } from './administrador-servicios-lista.page';

const routes: Routes = [
  {
    path: '',
    component: AdministradorServiciosListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorServiciosListaPageRoutingModule {}
