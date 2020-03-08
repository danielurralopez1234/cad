import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteLugarPage } from './cliente-lugar.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteLugarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteLugarPageRoutingModule {}
