import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

fdescribe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.modal')).toBeFalsy();
  });

  it('should show a Modal', () => {
    component.show = true;
    component.message = 'This is a message';
    component.title = 'This is a title';
    component.ok = 'Accept';
    component.showCancel= true;
    component.cancel = 'Cancel';
    spyOn(component, 'onClick')
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.modal-component__header h2').innerText).toBe('This is a title');
    expect(fixture.nativeElement.querySelector('.modal-component__text').innerText).toBe('This is a message');
    expect(fixture.nativeElement.querySelector('.modal-component__actions-ok').innerText).toBe('ACCEPT');
    expect(fixture.nativeElement.querySelector('.modal-component__actions-cancel').innerText).toBe('CANCEL');
    fixture.nativeElement.querySelector('.modal-component__actions-ok').click();
    expect(component.onClick).toHaveBeenCalledTimes(1);
    fixture.nativeElement.querySelector('.modal-component__actions-cancel').click()
    expect(component.onClick).toHaveBeenCalledTimes(2);
  });

  it('should close a Modal', () => {
    component.show = true;
    component.message = 'This is a message';
    component.title = 'This is a title';
    component.ok = 'Accept';
    component.showCancel = true;
    component.cancel = 'Cancel';
    spyOn(component, 'onClick')
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.modal-component__header h2').innerText).toBe('This is a title');
    expect(fixture.nativeElement.querySelector('.modal-component__text').innerText).toBe('This is a message');
    expect(fixture.nativeElement.querySelector('.modal-component__actions-ok').innerText).toBe('ACCEPT');
    expect(fixture.nativeElement.querySelector('.modal-component__actions-cancel').innerText).toBe('CANCEL');
    fixture.nativeElement.querySelector('.modal-component__actions-ok').click();
    expect(component.onClick).toHaveBeenCalledTimes(1);
    fixture.nativeElement.querySelector('.modal-component__actions-cancel').click();
    expect(component.onClick).toHaveBeenCalledTimes(2);
    fixture.nativeElement.querySelector('.modal-close').click();
    expect(component.onClick).toHaveBeenCalledTimes(3);
  });

});
