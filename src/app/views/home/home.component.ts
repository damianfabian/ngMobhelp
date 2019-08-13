import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognitoService';
import { APIService } from 'src/app/services/APIService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent implements OnInit {

  constructor(private router: Router, private service: APIService) { 
  }

  ngOnInit() {
  }

  async onContinue() {
    const userInfo = await this.service.getUserInfo();
    if (userInfo.preferences && userInfo.preferences.sections.length > 0) {
      this.router.navigate(['dashboard']);
    } else {
      this.router.navigate(['wizard']);
    }
  }
}
