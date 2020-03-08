import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientePagoPage } from './cliente-pago.page';

const routes: Routes = [
  {
    path: '',
    component: ClientePagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientePagoPageRoutingModule {}
