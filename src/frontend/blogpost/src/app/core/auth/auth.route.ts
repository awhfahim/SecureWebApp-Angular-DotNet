import {Route} from "@angular/router";
import {LoginComponent} from "./pages/login/login.component";

export const authRoutes: Route[] = [
  {
    path: 'login',
    loadComponent : () => import('./pages/login/login.component').then(m => m.LoginComponent),
    title: 'Login'
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent),
    title: 'Signup'
  }
];
