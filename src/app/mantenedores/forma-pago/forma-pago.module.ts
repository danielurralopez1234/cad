import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormaPagoPageRoutingModule } from './forma-pago-routing.module';
import { FormaPagoPage } from './forma-pago.page';
import { AddeditFormaPagoPage } from './modals/addedit-forma-pago/addedit-forma-pago.page';
import { AddeditFormaPagoPageRoutingModule } from './modals/addedit-forma-pago/addedit-forma-pago-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormaPagoPageRoutingModule,
    AddeditFormaPagoPageRoutingModule
  ],
  declarations: [FormaPagoPage, AddeditFormaPagoPage],
  entryComponents: [ AddeditFormaPagoPage ]
})
export class FormaPagoPageModule {}
