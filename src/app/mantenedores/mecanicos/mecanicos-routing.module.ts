import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MecanicosPage } from './mecanicos.page';

const routes: Routes = [
  {
    path: '',
    component: MecanicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MecanicosPageRoutingModule {}
