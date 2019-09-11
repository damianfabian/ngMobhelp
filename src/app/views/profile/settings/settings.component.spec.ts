import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ApplicationPipesModule } from 'src/app/shareModules/app.share.module';
import { AppSyncService } from 'src/app/services/appSync.service';
import { APIService } from 'src/app/services/APIService';
import { AllSectionsQuery } from 'src/app/types/SectionType';
import { GetUserInfosQuery } from 'src/app/types/UserInfoType';

const allSections = [
  {
    "id": "1",
    "name": "main",
    "title": "Main"
  },
  {
    "id": "2",
    "name": "main2",
    "title": "Main 2"
  }
];

fdescribe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let appSync: AppSyncService;
  let API: APIService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule, BrowserModule, ApplicationPipesModule, ToastrModule.forRoot() ],
      declarations: [ SettingsComponent ],
      providers: [ToastrService, APIService, AppSyncService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    appSync = TestBed.get(AppSyncService);
    API = TestBed.get(APIService);
    spyOn(appSync, 'AllSections').and.returnValue(Promise.resolve(<AllSectionsQuery>allSections));
    spyOn(API, 'getUserInfo').and.returnValue(Promise.resolve(<GetUserInfosQuery>{
      preferences: {
        sections: ['main']
      },
      id: 'user',
      topics: [{ id: 'main', isDone: true }]
    }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should work with sections', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      spyOn(component, 'changeSettings');
      spyOn(component, 'saveSettings');
      expect(fixture.nativeElement.querySelectorAll('.option-wrapper').length).toBe(2);
      const check = fixture.nativeElement.querySelector('.option-wrapper input');
      expect(check.checked).toBeTruthy();
      check.click();
      check.dispatchEvent(new Event('change'));
      expect(component.changeSettings).toHaveBeenCalled();
      expect(check.checked).toBeFalsy();
      fixture.nativeElement.querySelector('button').click();
      expect(component.saveSettings).toHaveBeenCalled();
    })
  }));
});
