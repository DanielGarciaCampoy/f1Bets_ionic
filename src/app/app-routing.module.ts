import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { HomePage } from './pages/folder/home/home.page';

const routes: Routes = [
  /*{
    path: '',
    loadChildren: () => import('./pages/folder/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'pilotos',
    loadChildren: () => import('./pages/folder/pilotos/pilotos.module').then( m => m.PilotosPageModule)
  },
  {
    path: 'circuitos',
    loadChildren: () => import('./pages/folder/circuitos/circuitos.module').then( m => m.CircuitosPageModule)
  },
  {
    path: 'apuestas',
    loadChildren: () => import('./pages/folder/apuestas/apuestas.module').then( m => m.ApuestasPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/folder/home/home.module').then( m => m.HomePageModule)
  },*/
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
    // component: LoginPage
  },
  {
    path: '',
    loadChildren: () => import('./pages/folder/tabs/tabs.module').then(m => m.TabsPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
