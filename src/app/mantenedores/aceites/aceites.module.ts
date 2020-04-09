import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AceitesPageRoutingModule } from './aceites-routing.module';

import { AceitesPage } from './aceites.page';
import {AddeditAceitePage} from './modals/addedit-aceite/addedit-aceite.page';
import {AddeditAceitePageRoutingModule} from './modals/addedit-aceite/addedit-aceite-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AceitesPageRoutingModule,
    AddeditAceitePageRoutingModule
  ],
  declarations: [AceitesPage, AddeditAceitePage],
  entryComponents: [
    AddeditAceitePage
  ]
})
export class AceitesPageModule {}
