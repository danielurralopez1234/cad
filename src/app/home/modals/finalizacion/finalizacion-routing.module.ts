import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalizacionPage } from './finalizacion.page';

const routes: Routes = [
  {
    path: '',
    component: FinalizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalizacionPageRoutingModule {}
