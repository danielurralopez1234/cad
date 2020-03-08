import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteAgregaAutoPage } from './cliente-agrega-auto.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteAgregaAutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteAgregaAutoPageRoutingModule {}
