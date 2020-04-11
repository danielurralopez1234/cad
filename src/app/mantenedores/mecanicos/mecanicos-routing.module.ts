import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MecanicosPage } from './mecanicos.page';

const routes: Routes = [
  {
    path: '',
    component: MecanicosPage
  },  {
    path: 'addedit-mecanicos',
    loadChildren: () => import('./modals/addedit-mecanicos/addedit-mecanicos.module').then( m => m.AddeditMecanicosPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MecanicosPageRoutingModule {}
