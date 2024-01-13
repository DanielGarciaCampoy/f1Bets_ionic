import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PilotosPage } from './pilotos.page';

const routes: Routes = [
  {
    path: '',
    component: PilotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PilotosPageRoutingModule {}
