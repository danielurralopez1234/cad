import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutosPage } from './autos.page';

const routes: Routes = [
  {
    path: '',
    component: AutosPage
  },  {
    path: 'addedit-auto',
    loadChildren: () => import('./modals/addedit-auto/addedit-auto.module').then( m => m.AddeditAutoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutosPageRoutingModule {}
