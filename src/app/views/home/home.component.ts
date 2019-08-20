import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/services/cognitoService';
import { APIService } from 'src/app/services/APIService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export default class HomeComponent implements OnInit {

  constructor(private router: Router, private service: APIService, private toastr: ToastrService) { 
  }

  ngOnInit() {
  }

  async onContinue() {
    this.service.getUserInfo().then(userInfo => {
      if (userInfo && userInfo.preferences && userInfo.preferences.sections.length > 0) {
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['wizard']);
      }
    }).catch(this.handleError.bind(this));
  }

  handleError(res) {
    if (res instanceof Object) {
      switch (res.errors[0].errorType) {
          case "UnauthorizedException":
              this.router.navigate(['/login']);
          break;
          default:
            this.router.navigate(['wizard']);  
            this.toastr.error(res.errors[0].message, 'Error');
          break;
      }
    }
  }
}
