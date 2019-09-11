import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { ShareTestModule } from 'src/tests/shareModule';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationPipesModule } from 'src/app/shareModules/app.share.module';
import { CognitoService, User } from 'src/app/services/cognitoService';
import { APIService } from 'src/app/services/APIService';

fdescribe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let cognito: CognitoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ApplicationPipesModule, RouterTestingModule ],
      declarations: [ ProfileComponent ],
      providers: [ CognitoService, APIService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    cognito = TestBed.get(CognitoService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show Modal', () => {
    spyOn(cognito, 'getUserAtributes').and.returnValue(<User>{ name: 'username'})
    spyOn(component, 'toggleModal');
    fixture.detectChanges();
    component.showModal = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.modal-component').length).toBe(1)
  });
});
