import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteLugarPageRoutingModule } from './cliente-lugar-routing.module';

import { ClienteLugarPage } from './cliente-lugar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteLugarPageRoutingModule
  ],
  declarations: [ClienteLugarPage]
})
export class ClienteLugarPageModule {}
