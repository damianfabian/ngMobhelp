import {AuthenticationDetails, CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';

export class CognitoService {
    private userPool: CognitoUserPool = null;
    private cognitoUser: CognitoUser = null;

    constructor() {
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
                onSuccess: (result: any) => {
                  localStorage.setItem('user', username);
                  res({ user: result });
                },
                onFailure: (error: any) => {
                  console.log(error);
                  rej(error);
                  //this.toastr.error(error.message, "Error")
                },
                newPasswordRequired: (userAttributes: any, requiredAttributes: any) => {
                  console.log(userAttributes, requiredAttributes);
                  res({ requireNewPassword : true });
                }
          });    
        })
    }
    
    changePassword(newPassword: string) {
        return new Promise((res, rej) => {
            this.cognitoUser.completeNewPasswordChallenge(
                newPassword,
                {},
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

    signOut() {
        if(this.cognitoUser) {
          this.cognitoUser.signOut();
        }
    }
}