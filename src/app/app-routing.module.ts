import { WebsocketGuardService } from './services/guards/websocket/websocket-guard.service';
import { AuthGuardService } from 'src/app/services/guards/auth/auth-guard.service';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./views/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule),
    canActivate: [WebsocketGuardService],
    canLoad: [AuthGuardService]
  },
  {
    path: 'user/create',
    loadChildren: () => import('./views/user/create/create.module').then( m => m.CreatePageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'chat',
    loadChildren: () => import('./views/chat/chat.module').then( m => m.ChatPageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'task/create',
    loadChildren: () => import('./views/task/create/create.module').then( m => m.CreatePageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'task/update',
    loadChildren: () => import('./views/task/update/update.module').then( m => m.UpdatePageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'task/list',
    loadChildren: () => import('./views/task/list/list.module').then( m => m.ListPageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'mytask/list',
    loadChildren: () => import('./views/my-task/list/list.module').then( m => m.ListPageModule),
    canLoad: [AuthGuardService]
  },
  {
    path: 'mytask/show',
    loadChildren: () => import('./views/my-task/show/show.module').then( m => m.ShowPageModule),
    canLoad: [AuthGuardService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
