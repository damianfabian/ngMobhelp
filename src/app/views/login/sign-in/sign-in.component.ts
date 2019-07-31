import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  remember: boolean = false;
  username: string = "";
  password: string = "";
  errorMessage: string = "";
  @Output() Login: EventEmitter<any> = new EventEmitter();

  constructor() { 

  }

  ngOnInit() {
  }

  onLogin() {
    this.Login.emit({ user: this.username, password: this.password, remember: this.remember });
  }

}
