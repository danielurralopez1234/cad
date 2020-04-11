import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddeditServicioPage } from './addedit-servicio.page';

const routes: Routes = [
  {
    path: '',
    component: AddeditServicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddeditServicioPageRoutingModule {}
