import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddeditAutoPage } from './addedit-auto.page';

const routes: Routes = [
  {
    path: '',
    component: AddeditAutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddeditAutoPageRoutingModule {}
