import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorAutosPage } from './administrador-autos.page';

const routes: Routes = [
  {
    path: '',
    component: AdministradorAutosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorAutosPageRoutingModule {}
