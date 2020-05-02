import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModeloPage } from './modelo.page';

const routes: Routes = [
  {
    path: '',
    component: ModeloPage
  },
  {
    path: 'modals',
    loadChildren: () => import('./modals/modals.module').then( m => m.ModalsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModeloPageRoutingModule {}
