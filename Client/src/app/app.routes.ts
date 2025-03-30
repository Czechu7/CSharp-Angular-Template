import { Routes } from '@angular/router';
import { RouterEnum } from './enums/router.enum';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { NotFoundComponent } from './features/not-found/not-found.component';

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
  {
    path: RouterEnum.notFound,
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: RouterEnum.notFound,
  },
];
