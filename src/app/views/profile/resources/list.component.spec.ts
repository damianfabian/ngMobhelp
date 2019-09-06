import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIconsComponent } from './list.component';

describe('ResourceComponent', () => {
  let component: ViewIconsComponent;
  let fixture: ComponentFixture<ViewIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
