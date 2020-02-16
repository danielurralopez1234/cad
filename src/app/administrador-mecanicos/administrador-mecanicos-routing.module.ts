import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorMecanicosPage } from './administrador-mecanicos.page';

const routes: Routes = [
  {
    path: '',
    component: AdministradorMecanicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorMecanicosPageRoutingModule {}
