import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileRoutingModule } from './views/profile/profile-routing.modules';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CognitoService } from './services/cognitoService';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { APIService } from './services/APIService';
import { AppSyncService } from './services/appSync.service';
import PubSub from '@aws-amplify/pubsub';
import API from '@aws-amplify/api';
import { environment } from 'src/environments/environment';
PubSub.configure(environment.appSync);
API.configure(environment.appSync);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ 
      positionClass: 'toast-bottom-center',
      preventDuplicates: true  
    }),
    FontAwesomeModule,
    ProfileRoutingModule,
    AppRoutingModule
  ],
  providers: [CognitoService, APIService, AppSyncService],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
    library.add(fas);
  }
 }
