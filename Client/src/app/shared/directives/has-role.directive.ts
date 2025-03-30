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
  set hasRole(roles: string[]) {
    this.requiredRoles = roles;
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
