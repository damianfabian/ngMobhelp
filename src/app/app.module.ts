import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CognitoService } from './services/cognitoService';
import { APIService } from './services/APIService';
import { AppSyncService } from './services/appSync.service';
import { ApplicationPipesModule } from './shareModules/app.share.module';
import { CookieGdprComponent } from './components/cookie-gdpr/cookie-gdpr.component';

@NgModule({
  declarations: [
    AppComponent,
    CookieGdprComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot({ 
      positionClass: 'toast-bottom-center',
      preventDuplicates: true  
    }),
    ApplicationPipesModule,
    AppRoutingModule
  ],
  providers: [CognitoService, APIService, AppSyncService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {}
 }
