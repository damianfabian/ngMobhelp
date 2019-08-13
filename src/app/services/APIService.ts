import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { AppSyncService } from './appSync.service';
import { AllSectionsQuery } from '../types/SectionType';
import { GetUserInfosQuery } from '../types/UserInfoType';

const USER_INFO_KEY = 'ngMobhelp-userInfo';
@Injectable({
    providedIn: "root"
})
export class APIService {
    private sections: AllSectionsQuery = null;
    private currentPage: SectionInfo = null;
    private userInfo: GetUserInfosQuery = null;

    constructor(private AppSync: AppSyncService) {
    }

    getCurrentPage() {
        return this.currentPage;
    }

    setCurrentPage(page: SectionInfo) {
        this.currentPage = page;
    }

    async getUserInfo(): Promise<GetUserInfosQuery> {
        const user = localStorage.getItem(USER_INFO_KEY);
        if(user){
            this.userInfo = JSON.parse(user);
        }

        return new Promise((res, rej) => {
            this.AppSync.GetUserInfos(this.userInfo.id).then(data => {
                this.setUserInfo(data);
                res(data);
            })
        })
    }

    setUserInfo(user: GetUserInfosQuery) {
        localStorage.setItem(USER_INFO_KEY, JSON.stringify(user))
        this.userInfo = user;
    }

    async getSections() {
        this.sections = await this.AppSync.AllSections();
        return this.sections;
    }

    markPageAsDone(page: SectionInfo) {
        const index = this.userInfo.topics.findIndex(topic => topic.id === page.id)
        const topic = { id: page.id, isDone: true }
        if (index >= 0) {
            this.userInfo.topics[index] = topic;
        } else {
            this.userInfo.topics.push(topic)
        }

        return this.AppSync.UpdateUserInfo(this.userInfo)
    }

    unmarkPageAsDone(page: SectionInfo) {
        const index = this.userInfo.topics.findIndex(topic => topic.id === page.id)
        const topic = { id: page.id, isDone: false }
        if (index >= 0) {
            this.userInfo.topics[index] = topic;
            return this.AppSync.UpdateUserInfo(this.userInfo)
        }

        return new Promise( (res) => ({ errors: [ 'The page can not be unmark' ] }) );
    }
}

export interface Section {
    label: string;
    pages: SectionInfo[];
}
  
export interface SectionInfo {
    label: string;
    icon: string;
    id?: string;
    isDone?: boolean;
    tabs: {
      label: string;
      template: string;
    }[];
}