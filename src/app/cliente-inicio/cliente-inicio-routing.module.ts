import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteInicioPage } from './cliente-inicio.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteInicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteInicioPageRoutingModule {}
