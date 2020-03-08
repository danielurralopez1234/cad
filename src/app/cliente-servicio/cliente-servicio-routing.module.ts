import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteServicioPage } from './cliente-servicio.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteServicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteServicioPageRoutingModule {}
