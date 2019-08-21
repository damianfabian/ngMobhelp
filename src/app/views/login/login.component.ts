import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { isMobile } from '../../../helpers/browser';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognitoService';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { AppSyncService } from 'src/app/services/appSync.service';
import { APIService } from 'src/app/services/APIService';
import { GetUserInfosQuery } from 'src/app/types/UserInfoType';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export default class LoginComponent implements OnInit {
  username: string = "";
  userInfo: GetUserInfosQuery;
  requireNewPassword: boolean = false;
  
  constructor(
    private toastr: ToastrService, 
    private router: Router, 
    private awsService: CognitoService, 
    private appSync: AppSyncService,
    private APIService: APIService
  ) {
    if(localStorage.getItem('user')) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
  }

  onLogin({ user, password }) {
    if(user.length > 0 && password.length > 0) {
      this.username = user;
      this.awsService.signupUser(user, password).then((res: {
        user?: CognitoUserSession,
        error?: { message: string },
        requireNewPassword?: boolean
      }) => {
        if(res.user) {
          this.appSync.GetUserInfos(user).then(userInfo => {
            if(userInfo) {
              this.APIService.setUserInfo(userInfo);
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/home']);
            }
          }).catch(err => {
            console.log(err);
          })
          
        }
        if(res.error) {
          this.toastr.error(res.error.message, 'Authentication Error');
        }

        if(res.requireNewPassword) {
          this.requireNewPassword = true;
        }
      }).catch(res => {
        if(res.error) {
          this.toastr.error(res.error.message, 'Authentication Error');
        }
      })
    }
  }

  onChangePassword(data: { password: string, name: string }) {
    const userAttr = { name: data.name, picture: 'http://some/url/here' };
    this.awsService.changePassword(data.password, userAttr).then((res: { success: Boolean, error?: { message?: string } }) => {
      if(res.success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.toastr.error(res.error!.message, 'Error');
      }
    })
  }

}
