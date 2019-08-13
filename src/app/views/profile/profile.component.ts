import { Component, OnInit } from '@angular/core';
import { CognitoService } from 'src/app/services/cognitoService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  initials: string;
  fullName: string;
  avatar: string;
  showModal: boolean = false;

  constructor(private awsService: CognitoService, private router: Router) { 
    this.fullName = "Jan Van Mobster";
    this.initials = "JV";
  }

  ngOnInit() {
  }

  onLogout() {
    localStorage.removeItem('user');
    this.awsService.signOut();
    this.router.navigate(['login']);
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

}
