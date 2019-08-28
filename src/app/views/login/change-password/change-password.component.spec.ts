import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

fdescribe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let password: any;
  let repassword: any;
  let name: any;
  let submit: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordComponent ],
      imports: [ FormsModule, BrowserModule, CommonModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    password = fixture.nativeElement.querySelector('input[name="password"]');
    repassword = fixture.nativeElement.querySelector('input[name="re-password"]');
    name = fixture.nativeElement.querySelector('input[name="name"]');
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
      password.value = 'someValue';
      password.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(submit.disabled).toBeTruthy();
      
      password.value = '';
      password.dispatchEvent(new Event('input'));
      repassword.value = 'someValue'
      repassword.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(submit.disabled).toBeTruthy();

      name.value = 'someValue'
      name.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(submit.disabled).toBeTruthy();

      password.value = 'someValues';
      password.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(submit.disabled).toBeTruthy();
      expect(fixture.nativeElement.querySelectorAll('.help').length).toEqual(1);

      password.value = 'someValue';
      password.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(submit.disabled).toBeFalsy();
      expect(fixture.nativeElement.querySelectorAll('.help').length).toEqual(0);
    })
  });

  it('should emit Submit event', () => {
    expect(component).toBeTruthy();
    fixture.whenStable().then(() => {
      password.value = 'someValue';
      password.dispatchEvent(new Event('input'));
      repassword.value = 'someValue'
      repassword.dispatchEvent(new Event('input'));
      name.value = 'someValue'
      name.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      spyOn(component.Submit, 'emit');
      submit.click();
      expect(component.Submit.emit).toHaveBeenCalledWith({ name: 'someValue', password: 'someValue' });
    })
  });
});
