import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AceiteInfoPage } from './aceite-info.page';

const routes: Routes = [
  {
    path: '',
    component: AceiteInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AceiteInfoPageRoutingModule {}
