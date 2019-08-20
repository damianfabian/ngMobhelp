import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppSyncService } from 'src/app/services/appSync.service';
import { APIService } from 'src/app/services/APIService';
import { ToastrService } from 'ngx-toastr';
import { GetUserInfosQuery } from 'src/app/types/UserInfoType';
import { Router } from '@angular/router';

interface SectionSetting {
  name: String;
  active: Boolean; 
  description: String;
  title: String;
}

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {
  searcher: string;
  topics: Array<SectionSetting>;
  userInfo: GetUserInfosQuery;

  constructor(
    private appSync: AppSyncService, 
    private service: APIService, 
    private ref: ChangeDetectorRef, 
    private toastr: ToastrService,
    private router: Router
  ) {
    ref.detach();
  }

  async ngOnInit() {    
    this.service.getUserInfo().then(res => {
      this.userInfo = res;
      this.appSync.AllSections().then(temp => {
        this.topics = temp.map(section => ({ active: false, name: section.name, title: section.title, description: section.description }) );
        this.ref.detectChanges();
      }).catch(res => {
        console.log('Error on Loading Data ', res.errors)
      });
    });
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
      this.router.navigate(['dashboard'])
    }).catch(res => {
      if(res.errors && res.errors.length > 0) {
        this.toastr.error(res.errors[0].message, 'Error');
      }
    })
  }
}