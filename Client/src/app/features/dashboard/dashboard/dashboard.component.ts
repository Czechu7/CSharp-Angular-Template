import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';
import { IsLoggedInDirective } from '../../../shared/directives/is-logged-in.directive';
import { NotLoggedInDirective } from '../../../shared/directives/not-logged-in.directive';
import { RolesEnum } from '../../../enums/roles.enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TranslateModule, HasRoleDirective, IsLoggedInDirective, NotLoggedInDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  protected readonly rolesEnum = RolesEnum;
}
