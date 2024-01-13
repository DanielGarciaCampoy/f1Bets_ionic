import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CircuitosPage } from './circuitos.page';

const routes: Routes = [
  {
    path: '',
    component: CircuitosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CircuitosPageRoutingModule {}
