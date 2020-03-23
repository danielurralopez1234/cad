import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientePagoExitoPageRoutingModule } from './cliente-pago-exito-routing.module';

import { ClientePagoExitoPage } from './cliente-pago-exito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientePagoExitoPageRoutingModule
  ],
  declarations: [ClientePagoExitoPage]
})
export class ClientePagoExitoPageModule {}
