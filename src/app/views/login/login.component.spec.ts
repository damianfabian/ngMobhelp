import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { ShareTestModule } from 'src/tests/shareModule';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, CommonModule, ShareTestModule, ToastrModule.forRoot(), RouterTestingModule ],
      declarations: [ LoginComponent, SignInComponent, ChangePasswordComponent ],
      providers: [ ToastrService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show Login View', () => {
    expect(fixture.nativeElement.querySelectorAll('.signin-component').length).toBe(1)
    expect(fixture.nativeElement.querySelectorAll('.change-password-component').length).toBe(0)
  });

  it('should show ChangePassword View', () => {
    component.requireNewPassword = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.change-password-component').length).toBe(1)
    expect(fixture.nativeElement.querySelectorAll('.signin-component').length).toBe(0)
  });
});
