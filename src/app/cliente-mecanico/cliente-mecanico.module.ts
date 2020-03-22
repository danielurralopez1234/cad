import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteMecanicoPageRoutingModule } from './cliente-mecanico-routing.module';

import { ClienteMecanicoPage } from './cliente-mecanico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteMecanicoPageRoutingModule
  ],
  
  declarations: [ClienteMecanicoPage]
})
export class ClienteMecanicoPageModule {}
