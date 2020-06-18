import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisautosPage } from './misautos.page';

const routes: Routes = [
  {
    path: '',
    component: MisautosPage
  },
  {
    path: 'edit-misautos',
    loadChildren: () => import('./edit-misautos/edit-misautos.module').then( m => m.EditMisautosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisautosPageRoutingModule {}
