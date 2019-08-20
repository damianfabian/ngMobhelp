import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @Output() Submit: EventEmitter<any> = new EventEmitter();
  password: string = "";
  rePassword: string = "";
  name: string = "";
  
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.Submit.emit({ password: this.password, name: this.name });
  }

}
