import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'pilotos',
        loadChildren: () => import('../pilotos/pilotos.module').then(m => m.PilotosPageModule)
      },
      {
        path: 'circuitos',
        loadChildren: () => import('../circuitos/circuitos.module').then(m => m.CircuitosPageModule)
      },
      {
        path: 'apuestas',
        loadChildren: () => import('../apuestas/apuestas.module').then(m => m.ApuestasPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
