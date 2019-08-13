import { Component, OnInit } from '@angular/core';
import { APIService, Section, SectionInfo } from 'src/app/services/APIService';
import { Router } from '@angular/router';
import { AllSectionsQuery } from 'src/app/types/SectionType';
import { GetUserInfosQuery } from 'src/app/types/UserInfoType';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  data: AllSectionsQuery;
  progress: Number = 0;
  userInfo: GetUserInfosQuery;

  constructor(private service: APIService, private router: Router) { 
  }

  ngOnInit() {
    this.service.getUserInfo().then(res => {
      this.userInfo = res;

      // Get all sections available in the BD
      this.service.getSections().then(res => {
        // Show only the sections the user has marked
        this.data = res.filter( section => this.userInfo.preferences.sections.findIndex(pSec => pSec === section.name) >= 0 )
        //Calculate the value per section
        const sectionValue = 100 / this.userInfo.preferences.sections.length;
        
        this.progress = Math.ceil(
          //Calculate the percentage of progress
          this.data.reduce((previous, section) => {
            //Calculate the value per Page
            const pageValue = sectionValue/section.pages.length
            //Calculate the value per section depending on the pages marked as Done
            return previous + section.pages.reduce((valor, page) => {
              const isDone = this.userInfo.topics.findIndex(topic => topic.id === page.id && topic.isDone) >= 0
              return valor + (isDone ? pageValue : 0)
            }, 0)
          }, 0)
        ); 
      });

    });
  }

  goToPage(page: SectionInfo) {
    const info = { ...page, isDone: this.isPageDone(page.id) }
    this.service.setCurrentPage(info);
    this.router.navigate(['/pageViewer']);
  }

  isPageDone(id: string) {
    return this.userInfo ? this.userInfo.topics.findIndex(topic => topic.id === id && topic.isDone) >= 0 : false
  }

}