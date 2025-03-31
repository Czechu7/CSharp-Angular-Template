// import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from '@angular/router';

// export const formCanDeactivateGuard: CanDeactivateFn<unknown> = (
//   component: unknown,
//   currentRoute: ActivatedRouteSnapshot,
//   currentState: RouterStateSnapshot,
//   nextState: RouterStateSnapshot
// ) => {
//   if (component instanceof PreferencesComponent) {
//     return component.activeButton
//       ? window.confirm('Do you really leave this page without save?')
//       : true;
//   }

//   if (component instanceof ChangePasswordComponent) {
//     return component.changePasswordForm.dirty
//       ? window.confirm('Do you really leave this page without save?')
//       : true;
//   }

//   if (component instanceof SettingsComponent) {
//     return component.activeButton
//       ? window.confirm('Do you really leave this page without save?')
//       : true;
//   }

//   return true;
// };
