import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorFormadepagoPage } from './administrador-formadepago.page';

const routes: Routes = [
  {
    path: '',
    component: AdministradorFormadepagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorFormadepagoPageRoutingModule {}
