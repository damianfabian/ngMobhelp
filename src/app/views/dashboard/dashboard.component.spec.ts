import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ApplicationPipesModule } from 'src/app/shareModules/app.share.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { APIService } from 'src/app/services/APIService';

const mainSection = {
  "id": "1",
  "name": "main",
  "pages": [
    {
        "icon": "visa",
        "id": "visa",
        "label": "European Union VISA",
        "tabs": [
            {
            "label": "Overview",
            "template": "<div class='header'><img src='https://mobhelpdocuments.s3.eu-central-1.amazonaws.com/img/visa.png' /></div><div class='content'><p>The visa for you and your family will be arranged by Mobiquity, to ready more about visa go to the Links tab  The HR department will contact with you to collect all needed documents. Make sure that you have following documents ready to share with the HR department: List of documents. In the second tab page you can find documents needed to apply for a visa for your family</p></div>"
            },
            {
            "label": "Docs",
            "template": "<div class='content'><ul class='list'><li class='list-item'><span class='icon'><app-icon iconsrc='id'></app-icon></span>or ID Document<br><small>Copy including pages with stamps</small></li><li class='list-item'><span class='icon'><app-icon iconsrc='marriage'></app-icon></span>Marriage certificate <br><small>In english and apostilled</small></li><li class='list-item'><span class='icon'><app-icon iconsrc='birth'></app-icon></span>Birth certificate <br><small>In english and apostilled</small></li><li class='list-item'><span class='icon'><app-icon iconsrc='document'></app-icon></span>Antecedents certificate <br><small>Signed</small></li></ul></div>"
            },
            {
            "label": "Links",
            "template": "<div class='content'><div class='card'><div class='card-image'><a class='image' href='https://www.iamexpat.nl/expat-info/official-issues/information-types-visa' target='_blank'><img src='https://mobhelpdocuments.s3.eu-central-1.amazonaws.com/img/iamexpat.png' alt='Iamexpat' /></a></div></div></div><div class='card'><div class='card-image'><a class='image' href='https://ind.nl/en/work/working_in_the_Netherlands' target='_blank'><img src='https://mobhelpdocuments.s3.eu-central-1.amazonaws.com/img/IND.png' alt='IND' /></a></div></div>"
            }
        ]
    }  
  ],
  "title": "Main"
}

const mainPreferences = {
  preferences: { sections: ['main'] }, id: "1", topics: []
}

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let API: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, FormsModule, BrowserModule, ApplicationPipesModule, ToastrModule.forRoot() ],
      declarations: [ DashboardComponent ],
      providers: [ToastrService, APIService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    API = TestBed.get(APIService);
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create dashboard', async(() => {
    spyOn(API, 'getUserInfo').and.returnValue(Promise.resolve(mainPreferences));
    spyOn(API, 'getSections').and.returnValue(Promise.resolve([mainSection]));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.data.length).toBe(1);
      expect(fixture.nativeElement.querySelectorAll('.menu-label').length).toEqual(1);
      expect(fixture.nativeElement.querySelectorAll('.menu-label span')[0].outerText).toEqual(mainSection.title);
      expect(fixture.nativeElement.querySelectorAll('.menu-list li').length).toEqual(mainSection.pages.length);
    })
  }));

  it('should create dashboard without preferences', async(() => {
    spyOn(API, 'getUserInfo').and.returnValue(Promise.resolve({}));
    spyOn(API, 'getSections').and.returnValue(Promise.resolve([mainSection]));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.data.length).toBe(0);
      expect(fixture.nativeElement.querySelectorAll('.menu-label').length).toEqual(0);
      expect(fixture.nativeElement.querySelectorAll('.menu-label span').length).toEqual(0);
      expect(fixture.nativeElement.querySelectorAll('.menu-list li').length).toEqual(0);
    })
  }));

  it('should go to pageviewer', async(() => {
    spyOn(API, 'getUserInfo').and.returnValue(Promise.resolve(mainPreferences));
    spyOn(API, 'getSections').and.returnValue(Promise.resolve([mainSection]));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      spyOn(component, 'goToPage');
      fixture.detectChanges();
      fixture.nativeElement.querySelector('.menu-link').click();
      expect(component.goToPage).toHaveBeenCalledWith(mainSection.pages[0]);
    })
  }));

  it('should work isPageDone', async(() => {
    spyOn(API, 'getUserInfo').and.returnValue(Promise.resolve(mainPreferences));
    spyOn(API, 'getSections').and.returnValue(Promise.resolve([mainSection]));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.isPageDone('visa')).toBeFalsy();
      component.userInfo.topics = [{ id: 'visa', isDone: true }];
      expect(component.isPageDone('visa')).toBeTruthy();
    })
  }));

});
