import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent implements OnInit {

  userPool: CognitoUserPool = null;
  cognitoUser: CognitoUser = null;

  constructor(private router: Router) { 
    const PoolData = {
      UserPoolId: environment.UserPoolId,
      ClientId: environment.ClientId
    };
    this.userPool = new CognitoUserPool(PoolData);
    this.cognitoUser = this.userPool.getCurrentUser();
  }

  ngOnInit() {
  }

  onLogout() {
    localStorage.removeItem('user');
    this.cognitoUser.signOut();
    this.router.navigate(['login']);
  }

}
