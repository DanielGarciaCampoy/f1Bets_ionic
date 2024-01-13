import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApuestasPage } from './apuestas.page';

const routes: Routes = [
  {
    path: '',
    component: ApuestasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApuestasPageRoutingModule {}
