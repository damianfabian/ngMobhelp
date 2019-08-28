import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppSyncService } from './services/appSync.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router, private AppSync: AppSyncService) {
  }

  ngOnInit(): void {
    if(!localStorage || !localStorage.getItem('user')) {
      this.router.navigate(['/login']);
    } else {
      this.AppSync.configure(localStorage.getItem('token'));
    }
  }
}
