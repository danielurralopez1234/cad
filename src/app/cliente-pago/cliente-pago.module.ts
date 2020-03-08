import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientePagoPageRoutingModule } from './cliente-pago-routing.module';

import { ClientePagoPage } from './cliente-pago.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientePagoPageRoutingModule
  ],
  declarations: [ClientePagoPage]
})
export class ClientePagoPageModule {}
