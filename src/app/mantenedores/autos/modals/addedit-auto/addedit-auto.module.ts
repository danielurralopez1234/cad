import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddeditAutoPageRoutingModule } from './addedit-auto-routing.module';

import { AddeditAutoPage } from './addedit-auto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddeditAutoPageRoutingModule
  ],
  declarations: [AddeditAutoPage]
})
export class AddeditAutoPageModule {}
