import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { APIService } from 'src/app/services/APIService';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EmptyComponent } from '../../../tests/emptyComponent';
import { ShareTestModule } from '../../../tests/shareModule';
import { ToastrService, ToastrModule } from 'ngx-toastr';

const mainPreferences = {
  preferences: { sections: ['main'] }, id: "1", topics: []
}

const routes = [
  { path: 'dashboard', component: EmptyComponent },
  { path: 'wizard', component: EmptyComponent }
]

fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [ RouterTestingModule.withRoutes(routes), ShareTestModule, ToastrModule.forRoot() ],
      providers: [ ToastrService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to Dashboard', async(() => {
    const API = TestBed.get(APIService);
    const router = TestBed.get(Router);
    spyOn(API, 'getUserInfo').and.returnValue(Promise.resolve(mainPreferences));
    spyOn(router, 'navigate');
    fixture.nativeElement.querySelector('.home-component__actions a').click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
    })
  }));

  it('should redirect to Wizard', async(() => {
    const API = TestBed.get(APIService);
    const router = TestBed.get(Router);
    spyOn(API, 'getUserInfo').and.returnValue(Promise.resolve({}));
    spyOn(router, 'navigate');
    fixture.nativeElement.querySelector('.home-component__actions a').click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(router.navigate).toHaveBeenCalledWith(['wizard']);
    })
  }));
});
