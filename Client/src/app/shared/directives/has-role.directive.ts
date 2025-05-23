import {
  Directive,
  effect,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
  untracked,
} from '@angular/core';
import { RoleService } from '../../core/_services/role/role.service';
import { RolesEnum } from '../../enums/roles.enum';

@Directive({
  selector: '[hasRole]',
  standalone: true,
})
export class HasRoleDirective {
  private templateRef = inject(TemplateRef);
  private viewContainer = inject(ViewContainerRef);
  private roleService = inject(RoleService);

  private requiredRoles: string[] | undefined;

  @Input()
  set hasRole(roles: RolesEnum[] | string[] | undefined) {
    this.requiredRoles = roles;

    if (roles === undefined || roles.length === 0) {
      this.requiredRoles = undefined;
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
      return;
    } else {
      this.requiredRoles = roles.map(role => String(role));
    }

    this.updateView();
  }

  constructor() {
    effect(() => {
      const currentRole = untracked(() => this.requiredRoles);
      if (currentRole) {
        this.updateView();
      }
    });
  }

  private updateView(): void {
    if (!this.requiredRoles) {
      this.viewContainer.clear();
      return;
    }

    const hasAccess = this.roleService.isAuthorized(this.requiredRoles);

    if (hasAccess && this.viewContainer.length === 0) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else if (!hasAccess) {
      this.viewContainer.clear();
    }
  }
}
