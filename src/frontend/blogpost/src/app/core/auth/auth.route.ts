import {Route} from "@angular/router";
import {LoginComponent} from "./pages/login/login.component";

export const authRoutes: Route[] = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  }
];
