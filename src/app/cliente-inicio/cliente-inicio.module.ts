import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteInicioPageRoutingModule } from './cliente-inicio-routing.module';

import { ClienteInicioPage } from './cliente-inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteInicioPageRoutingModule
  ],
  declarations: [ClienteInicioPage]
})
export class ClienteInicioPageModule {}
