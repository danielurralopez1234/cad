import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministradorAceitesPage } from './administrador-aceites.page';

const routes: Routes = [
  {
    path: '',
    component: AdministradorAceitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministradorAceitesPageRoutingModule {}
