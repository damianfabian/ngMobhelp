import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { AppSyncService } from './appSync.service';
import Auth, { CognitoUser } from '@aws-amplify/auth';

@Injectable({
  providedIn: "root"
})
export class CognitoService {
  user: CognitoUser;
  constructor(private appSync: AppSyncService) {
    Auth.configure(environment);
    this.user = null;
  }

  signupUser(username: string, password: string) {
    return new Promise((res, rej) => {
      Auth.signIn(username, password).then((user: any) => {
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          this.user = user;
          res({ requireNewPassword: true });
        } else {
          res(this.handleLogin(user))
        }
      }).catch(error => {
        console.log(error);
        rej({ error });
        //this.toastr.error(error.message, "Error")
      })
    })
  }

  handleLogin(user: CognitoUser) {
    var accessToken = user.getSignInUserSession().getAccessToken().getJwtToken();
    localStorage.setItem('user', JSON.stringify(user.getSignInUserSession().getIdToken().payload));
    localStorage.setItem('token', accessToken);
    this.appSync.configure(accessToken);
    return { user };
  }

  changePassword(newPassword: string, attributes: any = {}) {
    return new Promise((res, rej) => {
      Auth.completeNewPassword(
        this.user,
        newPassword,
        attributes
      ).then(user => {
        this.handleLogin(user);
        res({ success: true })
      }).catch(err => {
        console.log(err);
        rej({ error: err, success: false })
      })
    })
  }

  getCurrentUsername() {
    this.user.getUsername()
  }

  getUserAtributes(): User {
    return JSON.parse(localStorage.getItem('user'))
  }

  signOut() {
    Auth.currentAuthenticatedUser()
      .then(user => Auth.signOut())
      .catch(err => {
        console.log(err)
      })
  }
}

export interface UserAttributes {
  name: string;
  picture: string;
}

export interface User {
  aud: string;
  auth_time: number;
  "cognito:username": string;
  email: string;
  email_verified: boolean;
  event_id: string;
  name: string;
  phone_number: string;
  phone_number_verified: boolean;
  picture: string;
  token_use: string;
}