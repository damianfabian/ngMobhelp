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
    private service: APIService, 
    private ref: ChangeDetectorRef, 
    private toastr: ToastrService
  ) {
    ref.detach();
    this.handleError = this.handleError.bind(this);
    this.icons = Icons;
  }

  async ngOnInit() {    
    this.userInfo = this.service.getUserInfo();
    this.service.getSections().then(temp => {
      this.topics = temp.map(section => {
        const isActive = this.userInfo.preferences && this.userInfo.preferences.sections ? this.userInfo.preferences.sections.findIndex(item => item === section.name) >= 0 : false
        return { active: isActive, name: section.name, title: section.title, description: section.description }
      });
      this.ref.detectChanges();
    }).catch(this.handleError);
  }

  handleError(res) {
    if(res instanceof Object) {
      this.toastr.error(res.errors[0].message, 'Error');
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
    const userData = {
      preferences: {
        sections: preferences
      },
      topics: this.userInfo.topics
    }
    this.service.setUserInfo(userData);
    this.toastr.success("Settings has been saved!", "Notification", { timeOut: 2000 });
  }
}