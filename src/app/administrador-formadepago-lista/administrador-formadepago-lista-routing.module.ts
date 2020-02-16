import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorFormadepagoListaPage } from './administrador-formadepago-lista.page';

const routes: Routes = [
  {
    path: '',
    component: AdministradorFormadepagoListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorFormadepagoListaPageRoutingModule {}
