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
    loadComponent: () => import('./public/about/about.component').then(x => x.AboutComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./public/home/home.component').then(x => x.HomeComponent),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
