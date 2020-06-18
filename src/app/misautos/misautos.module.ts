import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MisautosPageRoutingModule } from './misautos-routing.module';

import { MisautosPage } from './misautos.page';
import {EditMisautosPage} from './edit-misautos/edit-misautos.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MisautosPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [MisautosPage, EditMisautosPage],
  entryComponents: [
    EditMisautosPage
  ]
})
export class MisautosPageModule {}
