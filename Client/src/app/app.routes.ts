import { Routes } from '@angular/router';
import { RouterEnum } from './enums/router.enum';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { AdminPanelComponent } from './features/admin/admin-panel/admin-panel.component';
import { AdminUsersComponent } from './features/admin/admin-users/admin-users.component';
import { AdminLogsComponent } from './features/admin/admin-logs/admin-logs.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { unAuthGuard } from './core/_guards/unauth.guard';
import { authGuard } from './core/_guards/auth.guard';
import { roleGuard } from './core/_guards/role.guard';
import { RolesEnum } from './enums/roles.enum';
import { ExampleCrudViewComponent } from './features/example-crud-view/example-crud-view.component';
import { AdminUsersEditComponent } from './features/admin/admin-users-edit/admin-users-edit.component';

export const routes: Routes = [
  {
    path: RouterEnum.home,
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: RouterEnum.dashboard,
    component: DashboardComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: [RolesEnum.ADMIN] },
  },
  {
    path: RouterEnum.admin,
    component: AdminPanelComponent,
    canActivate: [authGuard],
    data: { roles: [RolesEnum.ADMIN] },
    children: [
      { path: RouterEnum.users, component: AdminUsersComponent },
      { path: `${RouterEnum.users}/:id`, component: AdminUsersEditComponent },
      { path: RouterEnum.logs, component: AdminLogsComponent },
    ],
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
