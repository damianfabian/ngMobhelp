import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppSyncService } from 'src/app/services/appSync.service';
import { APIService } from 'src/app/services/APIService';
import { GetUserInfosQuery } from 'src/app/types/UserInfoType';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IconsType, Icons } from 'src/app/components/icon/icon.component';

interface SectionSetting {
  name: String;
  active: Boolean; 
  description: String;
  title: String;
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  searcher: string;
  topics: Array<SectionSetting>;
  userInfo: GetUserInfosQuery;
  icons: IconsType;

  constructor(
    private appSync: AppSyncService,
    private service: APIService, 
    private ref: ChangeDetectorRef, 
    private toastr: ToastrService,
    private router: Router
  ) {
    ref.detach();
    this.handleError = this.handleError.bind(this);
    this.icons = Icons;
  }

  async ngOnInit() {    
    this.service.getUserInfo().then(res => {
      this.userInfo = res;
      this.appSync.AllSections().then(temp => {
        this.topics = temp.map(section => {
          const isActive = res.preferences && res.preferences.sections ? res.preferences.sections.findIndex(item => item === section.name) >= 0 : false
          return { active: isActive, name: section.name, title: section.title, description: section.description }
        });
        this.ref.detectChanges();
      }).catch(this.handleError);
    }).catch(this.handleError);
  }

  handleError(res) {
    if(res instanceof Object) {
      if(res.errors.length > 0) {
        switch (res.errors[0].errorType || res.errors[0].message) {
          case "UnauthorizedException":
          case "Request failed with status code 401":
              this.service.logout();
              this.router.navigate(['/login']);
          break;
          default:
              this.toastr.error(res.errors[0].message, 'Error');
          break;
        }
      }
    } else {
      console.debug(res);
    }
  }

  onSearch(event) {
    this.searcher = event.target.value;
    this.ref.detectChanges();
  }

  changeSettings(event, topic: SectionSetting) {
    const index = this.topics.findIndex(section => section.name === topic.name);
    if(index >= 0) {
      this.topics[index].active = event.target.checked;
    }
  }

  async saveSettings() {
    const preferences = [];
    this.topics.forEach(section => section.active && preferences.push(section.name));
    this.appSync.UpdateUserInfo({
      id: this.userInfo.id,
      preferences: {
        sections: preferences
      },
      topics: this.userInfo.topics
    }).then(() => {
      this.toastr.success("Settings has been saved!", "Notification", { timeOut: 2000 });
    }).catch(res => {
      if(res.errors && res.errors.length > 0) {
        this.toastr.error(res.errors[0].message, 'Error');
      }
    })
  }
}