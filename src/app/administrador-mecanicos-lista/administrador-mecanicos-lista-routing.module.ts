import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorMecanicosListaPage } from './administrador-mecanicos-lista.page';

const routes: Routes = [
  {
    path: '',
    component: AdministradorMecanicosListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorMecanicosListaPageRoutingModule {}
