import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { APIService } from 'src/app/services/APIService';
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
  topics: Array<SectionSetting>;

  constructor(
    private service: APIService, 
    private ref: ChangeDetectorRef,
    private router: Router
  ) {
    ref.detach();
  }

  async ngOnInit() {    
    this.service.getSections().then(temp => {
      this.topics = temp.map(section => ({ active: false, name: section.name, title: section.title, description: section.description }) );
      this.ref.detectChanges();
    }).catch(res => {
      console.log('Error on Loading Data ', res.errors)
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
    const userData = {
      preferences: {
        sections: preferences
      },
      topics: []
    }
    this.service.setUserInfo(userData)
    this.router.navigate(['/dashboard'])
  }
}