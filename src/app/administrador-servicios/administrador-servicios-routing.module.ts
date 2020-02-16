import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorServiciosPage } from './administrador-servicios.page';

const routes: Routes = [
  {
    path: '',
    component: AdministradorServiciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorServiciosPageRoutingModule {}
