import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddeditMecanicosPageRoutingModule } from './addedit-mecanicos-routing.module';

import { AddeditMecanicosPage } from './addedit-mecanicos.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddeditMecanicosPageRoutingModule
  ],
  declarations: [AddeditMecanicosPage]
})
export class AddeditMecanicosPageModule {}
