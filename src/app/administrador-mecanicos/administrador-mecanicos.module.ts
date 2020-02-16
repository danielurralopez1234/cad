import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdministradorMecanicosPageRoutingModule } from './administrador-mecanicos-routing.module';

import { AdministradorMecanicosPage } from './administrador-mecanicos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdministradorMecanicosPageRoutingModule
  ],
  declarations: [AdministradorMecanicosPage]
})
export class AdministradorMecanicosPageModule {}
