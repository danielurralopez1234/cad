import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddeditMecanicosPage } from './addedit-mecanicos.page';

const routes: Routes = [
  {
    path: '',
    component: AddeditMecanicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddeditMecanicosPageRoutingModule {}
