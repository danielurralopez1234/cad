import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMisautosPage } from './edit-misautos.page';

const routes: Routes = [
  {
    path: '',
    component: EditMisautosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMisautosPageRoutingModule {}
