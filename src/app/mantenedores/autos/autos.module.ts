import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AutosPageRoutingModule } from './autos-routing.module';
import { AutosPage } from './autos.page';
import {AddeditAutoPage} from './modals/addedit-auto/addedit-auto.page';
import {AddeditAutoPageRoutingModule} from './modals/addedit-auto/addedit-auto-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutosPageRoutingModule,
    AddeditAutoPageRoutingModule
  ],
  declarations: [AutosPage, AddeditAutoPage],
  entryComponents: [
    AddeditAutoPage
  ]
})
export class AutosPageModule {}
