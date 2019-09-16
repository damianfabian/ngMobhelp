import { Injectable } from '@angular/core';
import { AppSyncService } from './appSync.service';
import { GetUserInfosQuery } from '../types/UserInfoType';
import { CognitoService, User } from './cognitoService';

const USER_KEY = 'ngMobhelp-userInfo';
const UNAUTHORIZED_USER = { errors: [{ errorType: 'UnauthorizedException' }]}
@Injectable({
    providedIn: "root"
})
export class APIService {
    private currentPage: SectionInfo = null;
    private userInfo: GetUserInfosQuery = null;

    constructor(private AppSync: AppSyncService) {
        this.configure();
        this.userInfo = this.getUserInfo();
    }

    configure() {
        this.AppSync.configure();
    }

    getCurrentPage() {
        return this.currentPage;
    }

    setCurrentPage(page: SectionInfo) {
        this.currentPage = page;
    }

    getUserInfo(): GetUserInfosQuery | null {
        const user = localStorage.getItem(USER_KEY);
        if(user && user !== "undefined") {
            return JSON.parse(user);
        } 
        return null;
    }

    setUserInfo(user: GetUserInfosQuery) {
        localStorage.setItem(USER_KEY, JSON.stringify(user))
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
        this.setUserInfo(this.userInfo)
    }

    unmarkPageAsDone(page: SectionInfo) {
        const index = this.userInfo.topics.findIndex(topic => topic.id === page.id)
        const topic = { id: page.id, isDone: false }
        if (index >= 0) {
            this.userInfo.topics[index] = topic;
            this.setUserInfo(this.userInfo);
        }
    }

    logout() {
        localStorage.removeItem(USER_KEY);
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