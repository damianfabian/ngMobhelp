import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationPipesModule } from 'src/app/shareModules/app.share.module';
import { APIService } from 'src/app/services/APIService';
import { ToastrModule, ToastrService } from 'ngx-toastr';

fdescribe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ApplicationPipesModule, RouterTestingModule, ToastrModule.forRoot() ],
      declarations: [ ProfileComponent ],
      providers: [ APIService, ToastrService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
