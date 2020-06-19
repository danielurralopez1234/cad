import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddeditMecanicosPageRoutingModule } from './addedit-mecanicos-routing.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddeditMecanicosPageRoutingModule,
        ReactiveFormsModule
    ]
})
export class AddeditMecanicosPageModule {}
