import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PilotosPageRoutingModule } from './pilotos-routing.module';

import { PilotosPage } from './pilotos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PilotosPageRoutingModule
  ],
  declarations: []
})
export class PilotosPageModule {}
