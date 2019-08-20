import {AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoIdToken, CognitoUserSession} from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { AppSyncService } from './appSync.service';

@Injectable({
  providedIn: "root"
})
export class CognitoService {
    private userPool: CognitoUserPool = null;
    private cognitoUser: CognitoUser = null;
    private userInfo: CognitoIdToken;

    constructor(private appSync: AppSyncService) {
        const PoolData = {
            UserPoolId: environment.UserPoolId,
            ClientId: environment.ClientId
        };
        this.userPool = new CognitoUserPool(PoolData);
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

        this.cognitoUser = new CognitoUser(userData);

        return new Promise((res, rej) => {
            this.cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (result: CognitoUserSession) => {
                  var accessToken = result.getAccessToken().getJwtToken();
                  localStorage.setItem('user', JSON.stringify(result.getIdToken().payload));
                  localStorage.setItem('token', accessToken);
                  this.appSync.configure(accessToken);
                  res({ user: result });
                },
                onFailure: (error: any) => {
                  console.log(error);
                  rej({ error });
                  //this.toastr.error(error.message, "Error")
                },
                newPasswordRequired: (userAttributes: any, requiredAttributes: any) => {
                  console.log(userAttributes, requiredAttributes);
                  res({ requireNewPassword : true });
                }
          });    
        })
    }
    
    changePassword(newPassword: string, attributes: any = {}) {
        return new Promise((res, rej) => {
            this.cognitoUser.completeNewPasswordChallenge(
                newPassword,
                attributes,
                {
                  onSuccess: (result: any) => {
                    localStorage.setItem('user', this.cognitoUser.getUsername());
                    res({ success: true })
                  },
                  onFailure: (error: any) => {
                    console.error(error);
                    //this.toastr.error(error.message, "Error")
                    rej({ error , success: false })
                  }
                }
            );
        })
    }

    getCurrentUsername() {
        this.cognitoUser.getUsername()
    }

    getUserAtributes(): User {
      return JSON.parse(localStorage.getItem('user'))
    }

    signOut() {
        if(this.cognitoUser) {
          this.cognitoUser.signOut();
        }
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