import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RoleService } from '../../core/_services/role/role.service';
import { HasRoleDirective } from './has-role.directive';

@Component({
  template: `
    <div *hasRole="['admin']" data-testid="admin-content">Admin Content</div>
    <div *hasRole="['user']" data-testid="user-content">User Content</div>
    <div *hasRole="['admin', 'user']" data-testid="multi-role-content">Multi-Role Content</div>
  `,
})
class TestComponent {}

describe('HasRoleDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];
  let mockRoleService: jasmine.SpyObj<RoleService>;

  beforeEach(() => {
    mockRoleService = jasmine.createSpyObj('RoleService', ['isAuthorized']);

    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [HasRoleDirective],
      providers: [{ provide: RoleService, useValue: mockRoleService }],
    });

    fixture = TestBed.createComponent(TestComponent);
  });

  it('should show content when user has required role', () => {
    mockRoleService.isAuthorized.and.returnValue(true);

    fixture.detectChanges();
    des = fixture.debugElement.queryAll(By.css('[data-testid="admin-content"]'));

    expect(des.length).toBe(1);
    expect(des[0].nativeElement.textContent).toContain('Admin Content');
  });

  it('should hide content when user does not have required role', () => {
    mockRoleService.isAuthorized.and.returnValue(false);

    fixture.detectChanges();
    des = fixture.debugElement.queryAll(By.css('[data-testid="admin-content"]'));

    expect(des.length).toBe(0);
  });

  it('should check multiple roles correctly', () => {
    mockRoleService.isAuthorized.and.callFake((roles: string[]) => {
      return roles.includes('user');
    });

    fixture.detectChanges();
    const adminContent = fixture.debugElement.queryAll(By.css('[data-testid="admin-content"]'));
    const userContent = fixture.debugElement.queryAll(By.css('[data-testid="user-content"]'));
    const multiRoleContent = fixture.debugElement.queryAll(
      By.css('[data-testid="multi-role-content"]'),
    );

    expect(adminContent.length).toBe(0);
    expect(userContent.length).toBe(1);
    expect(multiRoleContent.length).toBe(1);
  });

  it('should call roleService.isAuthorized with correct roles', () => {
    fixture.detectChanges();

    expect(mockRoleService.isAuthorized).toHaveBeenCalledWith(['admin']);
    expect(mockRoleService.isAuthorized).toHaveBeenCalledWith(['user']);
    expect(mockRoleService.isAuthorized).toHaveBeenCalledWith(['admin', 'user']);
  });
});
