import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteMecanicoPage } from './cliente-mecanico.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteMecanicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteMecanicoPageRoutingModule {}
