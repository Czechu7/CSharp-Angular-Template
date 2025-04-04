import { Routes } from '@angular/router';
import { RouterEnum } from './enums/router.enum';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { unAuthGuard } from './core/_guards/unauth.guard';
import { authGuard } from './core/_guards/auth.guard';
import { roleGuard } from './core/_guards/role.guard';
import { RolesEnum } from './enums/roles.enum';
import { ExampleCrudViewComponent } from './features/example-crud-view/example-crud-view.component';

export const routes: Routes = [
  {
    path: RouterEnum.home,
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: RouterEnum.admin,
    component: DashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [RolesEnum.ADMIN] },
  },
  {
    path: RouterEnum.login,
    component: LoginComponent,
    canActivate: [unAuthGuard],
  },
  {
    path: RouterEnum.register,
    component: RegisterComponent,
    canActivate: [unAuthGuard],
  },
  { path: RouterEnum.karmelki, component: ExampleCrudViewComponent },
  {
    path: RouterEnum.notFound,
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: RouterEnum.notFound,
  },
];
