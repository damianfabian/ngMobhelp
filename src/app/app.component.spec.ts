import 'zone.js/dist/zone-testing';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { EmptyComponent } from '../tests/emptyComponent';

fdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'login', component: EmptyComponent }])],
      declarations: [AppComponent, EmptyComponent]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.debugElement.componentInstance;
      router = TestBed.get(Router);
    });
  }));

  afterEach(() => {
    localStorage.clear();
  })

  fit('should redirect to Login', () => {
    const spy = spyOn(router, 'navigate');
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(['/login']);
  });

  fit('should not redirect to Login', () => {
    const spy = spyOn(router, 'navigate');
    localStorage.setItem('user', 'username');
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(spy).not.toHaveBeenCalled();
  });
});
