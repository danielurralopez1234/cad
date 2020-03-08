import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteMisServiciosPage } from './cliente-mis-servicios.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteMisServiciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteMisServiciosPageRoutingModule {}
