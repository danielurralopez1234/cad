import { NgModule,LOCALE_ID  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ClienteMecanicoPageRoutingModule } from './cliente-mecanico-routing.module';

import { ClienteMecanicoPage } from './cliente-mecanico.page';
import { NgCalendarModule  } from 'ionic2-calendar';
import { RouterModule } from '@angular/router';

import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(es);

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
  providers: [ { provide: LOCALE_ID, useValue: 'es-*' } ],
  declarations: [ClienteMecanicoPage]
})
export class ClienteMecanicoPageModule {}
