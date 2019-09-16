import 'zone.js/dist/zone-testing';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { EmptyComponent } from '../tests/emptyComponent';
import { APIService } from './services/APIService';

fdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let API: APIService;

  beforeEach(async(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'login', component: EmptyComponent }])],
      declarations: [AppComponent, EmptyComponent]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      API = TestBed.get(APIService);
      component = fixture.debugElement.componentInstance;
      router = TestBed.get(Router);
    });
  }));

  afterEach(() => {
    localStorage.clear();
  })

  fit('should redirect to Home', () => {
    const spy = spyOn(router, 'navigate');
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(['/home']);
  });

  fit('should redirect to dashboard', () => {
    const spy = spyOn(router, 'navigate');
    API.setUserInfo({ preferences: { sections: ['someinfo'] }, topics: [ { id: 'some', isDone: false }] });
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(['/dashboard']);
  });
});
