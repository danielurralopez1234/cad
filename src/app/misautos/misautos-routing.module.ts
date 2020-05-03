import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisautosPage } from './misautos.page';

const routes: Routes = [
  {
    path: '',
    component: MisautosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisautosPageRoutingModule {}
