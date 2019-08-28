import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

fdescribe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let username: any;
  let password: any;
  let submit: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      imports: [ FormsModule, BrowserModule, CommonModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    username = fixture.nativeElement.querySelector('input[name="username"]');
    password = fixture.nativeElement.querySelector('input[name="password"]');
    submit = fixture.nativeElement.querySelector('button');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit on valid form', () => {
    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(submit.disabled).toBeTruthy();
      username.value = 'someValue';
      username.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(submit.disabled).toBeTruthy();
      
      username.value = '';
      username.dispatchEvent(new Event('input'));
      password.value = 'someValue'
      password.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(submit.disabled).toBeTruthy();

      username.value = 'someValue'
      username.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(submit.disabled).toBeFalsy();
    })
  });

  it('should emit Submit event', () => {
    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
      username.value = 'someValue';
      username.dispatchEvent(new Event('input'));
      password.value = 'someValue'
      password.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      spyOn(component.Login, 'emit');
      submit.click();
      expect(component.Login.emit).toHaveBeenCalledWith({ user: 'someValue', password: 'someValue', remember: false });
    })
  });
});
