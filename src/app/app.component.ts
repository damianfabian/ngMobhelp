import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from './services/APIService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private ApiService: APIService) {
  }

  ngOnInit(): void {
    if(!this.ApiService.getUserInfo()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
