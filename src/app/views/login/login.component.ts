import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';
import { environment } from '../../../environments/environment';
import { isMobile } from '../../../helpers/browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export default class LoginComponent implements OnInit {
  username: string = "";
  requireNewPassword: boolean = false;
  userPool: CognitoUserPool = null;
  cognitoUser: CognitoUser = null;

  constructor(private toastr: ToastrService, private router: Router) {
    const PoolData = {
      UserPoolId: environment.UserPoolId,
      ClientId: environment.ClientId
    };
    this.userPool = new CognitoUserPool(PoolData);

    if(localStorage.getItem('user')) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

  onLogin({ user, password }) {
    if(user.length > 0 && password.length > 0) {
      this.signupUser(user, password)
    }
  }

  onChangePassword(newPassword) {
    this.cognitoUser.completeNewPasswordChallenge(
      newPassword,
      {},
      {
        onSuccess: (result: any) => {
          localStorage.setItem('user', this.username);
          this.router.navigate(['/home']);
        },
        onFailure: (error: any) => {
          console.error(error);
          this.toastr.error(error.message, "Error")
        }
      }
    );
  }

  signupUser(username: string, password: string) {
    const authenticationData = {
      Username: username,
      Password: password
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);

    var userData = {
      Username: username,
      Pool: this.userPool
    };
    this.username = username;
    this.cognitoUser = new CognitoUser(userData);

    this.cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result: any) => {
        localStorage.setItem('user', username);
      },
      onFailure: (error: any) => {
        console.log(error);
        this.toastr.error(error.message, "Error")
      },
      newPasswordRequired: (userAttributes: any, requiredAttributes: any) => {
        console.log(userAttributes, requiredAttributes);
        this.requireNewPassword = true;
      }
    });
  }



}
