import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddeditFormaPagoPageRoutingModule } from './addedit-forma-pago-routing.module';

import { AddeditFormaPagoPage } from './addedit-forma-pago.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddeditFormaPagoPageRoutingModule
  ],
  declarations: [AddeditFormaPagoPage]
})
export class AddeditFormaPagoPageModule {}
