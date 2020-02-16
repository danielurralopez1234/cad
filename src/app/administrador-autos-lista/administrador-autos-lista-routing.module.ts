import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorAutosListaPage } from './administrador-autos-lista.page';

const routes: Routes = [
  {
    path: '',
    component: AdministradorAutosListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorAutosListaPageRoutingModule {}
