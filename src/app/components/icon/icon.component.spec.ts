import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent, Icons } from './icon.component';


fdescribe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img').src).toContain('mob.svg');
  });

  it('should return a valid Icon', () => {
    component.iconsrc = Icons.info;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img').src).toContain('info.svg');
  });

  it('should return a valid Icon', () => {
    component.iconsrc = 'wrong';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img').src).toContain('mob.svg');
  });
});
