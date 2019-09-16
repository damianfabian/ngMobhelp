import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/APIService';
import { Router } from '@angular/router';
import config from '../../config';
import { Icons, IconsType } from 'src/app/components/icon/icon.component';
import { ToastrService } from 'ngx-toastr';

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
  version: string;
  icons: IconsType;
  handbookUrl: string;

  constructor(private service: APIService, private toastr: ToastrService, private router: Router) {   
  }

  ngOnInit() {
    this.version = config.version;
    this.icons = Icons;
    this.handbookUrl = config.handbookUrl;
  }

  deleteData() {
    this.service.logout();
    this.toastr.success('All your data was remove it.', 'Notification');
    this.router.navigate(['home']);
  }

}
