import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ClienteMecanicoPageRoutingModule } from './cliente-mecanico-routing.module';

import { ClienteMecanicoPage } from './cliente-mecanico.page';
import { NgCalendarModule  } from 'ionic2-calendar';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteMecanicoPageRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: ClienteMecanicoPage
      }
    ]),
    NgCalendarModule
  ],
  
  declarations: [ClienteMecanicoPage]
})
export class ClienteMecanicoPageModule {}
