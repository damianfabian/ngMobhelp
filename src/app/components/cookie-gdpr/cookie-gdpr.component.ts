import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cookie-gdpr',
  templateUrl: './cookie-gdpr.component.html',
  styleUrls: ['./cookie-gdpr.component.scss']
})
export class CookieGdprComponent implements OnInit {
  showAlert: boolean;

  constructor() { }

  ngOnInit() {
    this.showAlert = localStorage.getItem(environment.GDPR_COOKIE_KEY) === null;
  }

  onAccept() {
    localStorage.setItem(environment.GDPR_COOKIE_KEY, 'true');
    this.showAlert = false;
  }

  onDecline() {
    localStorage.setItem(environment.GDPR_COOKIE_KEY, 'false');
    this.showAlert = false;
  }

}
