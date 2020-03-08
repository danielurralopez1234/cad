import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MecanicoInicioPage } from './mecanico-inicio.page';

const routes: Routes = [
  {
    path: '',
    component: MecanicoInicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MecanicoInicioPageRoutingModule {}
