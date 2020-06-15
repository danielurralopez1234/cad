import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddeditAceitePageRoutingModule } from './addedit-aceite-routing.module';

import { AddeditAceitePage } from './addedit-aceite.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddeditAceitePageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AddeditAceitePage]
})
export class AddeditAceitePageModule {}
