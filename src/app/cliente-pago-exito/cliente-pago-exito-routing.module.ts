import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientePagoExitoPage } from './cliente-pago-exito.page';

const routes: Routes = [
  {
    path: '',
    component: ClientePagoExitoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientePagoExitoPageRoutingModule {}
