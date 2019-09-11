import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewerComponent } from './page-viewer.component';
import { DynamicHTMLModule } from 'src/app/components/dynamicHtml';
import { IconComponent } from 'src/app/components/icon/icon.component';
import { ApplicationPipesModule } from 'src/app/shareModules/app.share.module';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { APIService } from 'src/app/services/APIService';
import { Router } from '@angular/router';
import { EmptyComponent } from 'src/tests/emptyComponent';
import { ShareTestModule } from 'src/tests/shareModule';


const pageInfo = {
  "icon": "money-check-alt",
  "id": "bank",
  "label": "Bank",
  "tabs": [
    {
      "label": "Account",
      "template": "<div class='header'><img src='https://picsum.photos/id/235/200/300' /></div><div class='content'><p>Lorem Ipsum Overview</p></div>"
    },
    {
      "label": "Apps",
      "template": "<div class='content'><div class='list'><p class='list-item'><span class='icon'><app-icon iconsrc='bsn'></app-icon></span>Featured</p><p class='list-item'><span class='icon'><i class='fas fa-home'></i></span>Featured 1</p></div>"
    },
    {
      "label": "Links",
      "template": "<div class='content-links'><div class='card'><div class='card-image'><a class='image' href='https://funda.nl' target='_blank'><img src='https://picsum.photos/id/235/300/180' alt='Funda' /></a></div></div></div>"
    }
  ]
};

fdescribe('PageViewerComponent', () => {
  let component: PageViewerComponent;
  let fixture: ComponentFixture<PageViewerComponent>;
  let API : APIService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        DynamicHTMLModule.forRoot({
          components: [
            { component: IconComponent, selector: 'app-icon' }
          ]
        }),
        ApplicationPipesModule,
        ShareTestModule,
        RouterTestingModule.withRoutes([ { path: 'dashboard', component: EmptyComponent }]),
        ToastrModule.forRoot()
    ],
      declarations: [ PageViewerComponent ],
      providers: [ToastrService, APIService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageViewerComponent);
    component = fixture.componentInstance;
    API = TestBed.get(APIService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be redirect to Dashboard', () => {
    const router = TestBed.get(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
  });

  it('should render the page', () => {
    const router = TestBed.get(Router);
    spyOn(API, 'getCurrentPage').and.returnValue(pageInfo);
    spyOn(router, 'navigate');
    fixture.detectChanges();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(fixture.nativeElement.querySelectorAll('.tabs ul li').length).toBe(3)
    expect(fixture.nativeElement.querySelectorAll('.tabs-content .header').length).toBe(1)

    fixture.nativeElement.querySelectorAll('.tabs ul>li')[1].querySelector('a').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.tabs-content .header').length).toBe(0);
    expect(fixture.nativeElement.querySelectorAll('.tabs-content .content').length).toBe(1)
    expect(fixture.nativeElement.querySelectorAll('.icon app-icon').length).toBe(1);

    fixture.nativeElement.querySelectorAll('.tabs ul li')[2].querySelector('a').click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('.tabs-content .content').length).toBe(0);
    expect(fixture.nativeElement.querySelectorAll('.tabs-content .content-links').length).toBe(1)
  });
});
