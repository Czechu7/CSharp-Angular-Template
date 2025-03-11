import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { RouterEnum } from './config/router.enum';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: RouterEnum.home,
    component: DashboardComponent,
  },
  {
    path: RouterEnum.login,
    component: LoginComponent,
  },
  {
    path: RouterEnum.register,
    component: RegisterComponent,
  },
];
