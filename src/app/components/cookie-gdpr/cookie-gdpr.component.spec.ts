import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieGdprComponent } from './cookie-gdpr.component';

describe('CookieGdprComponent', () => {
  let component: CookieGdprComponent;
  let fixture: ComponentFixture<CookieGdprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookieGdprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieGdprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
