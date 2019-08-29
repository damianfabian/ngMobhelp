import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/services/APIService';
import { CognitoService } from 'src/app/services/cognitoService';
import config from '../../config';
import { Icons, IconsType } from 'src/app/components/icon/icon.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  initials: string;
  fullName: string;
  avatar: string;
  showModal: boolean = false;
  version: string;
  icons: IconsType;
  handbookUrl: string;

  constructor(private service: APIService, private router: Router, private cognito: CognitoService) {   
      const cognitoUser = this.cognito.getUserAtributes();
      this.fullName = cognitoUser.name;
      this.initials = cognitoUser.name.length >= 2 ? cognitoUser.name.substring(0, 2) : cognitoUser.name[0];
      this.version = config.version;
      this.icons = Icons;
      this.handbookUrl = config.handbookUrl;
  }

  ngOnInit() {
  }

  onLogout() {
    localStorage.removeItem('user');
    this.service.logout();
    this.router.navigate(['login']);
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

}
