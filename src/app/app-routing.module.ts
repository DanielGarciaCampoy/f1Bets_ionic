import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./folder/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'pilotos',
    loadChildren: () => import('./folder/pilotos/pilotos.module').then( m => m.PilotosPageModule)
  },
  {
    path: 'circuitos',
    loadChildren: () => import('./folder/circuitos/circuitos.module').then( m => m.CircuitosPageModule)
  },
  {
    path: 'apuestas',
    loadChildren: () => import('./folder/apuestas/apuestas.module').then( m => m.ApuestasPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./folder/home/home.module').then( m => m.HomePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
