import { Injectable } from '@angular/core';
import { AppSyncService } from './appSync.service';
import { AllSectionsQuery } from '../types/SectionType';
import { GetUserInfosQuery } from '../types/UserInfoType';
import { CognitoService, User } from './cognitoService';

const USER_INFO_KEY = 'ngMobhelp-userInfo';
const USER_KEY = 'user';
const UNAUTHORIZED_USER = { errors: [{ errorType: 'UnauthorizedException' }]}
@Injectable({
    providedIn: "root"
})
export class APIService {
    private sections: AllSectionsQuery = null;
    private currentPage: SectionInfo = null;
    private userInfo: GetUserInfosQuery = null;

    constructor(private AppSync: AppSyncService, private cognito: CognitoService) {
    }

    getCurrentPage() {
        return this.currentPage;
    }

    setCurrentPage(page: SectionInfo) {
        this.currentPage = page;
    }

    async getUserInfo(): Promise<GetUserInfosQuery> {
        const user = localStorage.getItem(USER_KEY);
        if(user && user !== "undefined") {
            const cognitoData : User = JSON.parse(user);
            const username = cognitoData["cognito:username"];
            return new Promise((res, rej) => {
                this.AppSync.GetUserInfos(username).then(data => {
                    const userInfo = data ? data : { id: username, preferences: { sections: [] } };
                    this.setUserInfo(<GetUserInfosQuery>userInfo)
                    res(<GetUserInfosQuery>userInfo);
                }).catch(err => { 
                    rej(err) 
                })
            })
        } else {
            this.logout();
        }

        return new Promise((res, rej) => rej(UNAUTHORIZED_USER))
    }

    setUserInfo(user: GetUserInfosQuery) {
        localStorage.setItem(USER_INFO_KEY, JSON.stringify(user))
        this.userInfo = user;
    }

    getSections() {
        return this.AppSync.AllSections();
    }

    markPageAsDone(page: SectionInfo) {
        const topic = { id: page.id, isDone: true }
        if (this.userInfo && this.userInfo.topics) {
            const index = this.userInfo.topics.findIndex(topic => topic.id === page.id)
            if (index >= 0) {
                this.userInfo.topics[index] = topic;
            } else {
                this.userInfo.topics.push(topic)
            }
        } else {
            this.userInfo.topics = [topic]
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

    logout() {
        localStorage.removeItem(USER_INFO_KEY);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.cognito.signOut();
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