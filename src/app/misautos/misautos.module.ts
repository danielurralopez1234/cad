import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisautosPageRoutingModule } from './misautos-routing.module';

import { MisautosPage } from './misautos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MisautosPageRoutingModule
  ],
  declarations: [MisautosPage]
})
export class MisautosPageModule {}
