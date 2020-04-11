import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddeditAceitePage } from './addedit-aceite.page';

const routes: Routes = [
  {
    path: '',
    component: AddeditAceitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddeditAceitePageRoutingModule {}
