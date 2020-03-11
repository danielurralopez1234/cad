import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MecanicosPageRoutingModule } from './mecanicos-routing.module';

import { MecanicosPage } from './mecanicos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MecanicosPageRoutingModule
  ],
  declarations: [MecanicosPage]
})
export class MecanicosPageModule {}
