import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AceitesPageRoutingModule } from './aceites-routing.module';

import { AceitesPage } from './aceites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AceitesPageRoutingModule
  ],
  declarations: [AceitesPage]
})
export class AceitesPageModule {}
