import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./shared/page-not-found/page-not-found.component";
import {AuthGuard} from "./core/auth/guards/auth.guard";

export const routes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./core/auth/auth.route').then(x => x.authRoutes)
   },
  {
    path: 'about',
    canActivate: [AuthGuard],
    loadComponent: () => import('./public/about/about.component').then(x => x.AboutComponent)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadComponent: () => import('./public/home/home.component').then(x => x.HomeComponent)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
