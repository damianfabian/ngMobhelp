import { Component, OnInit } from '@angular/core';
import { SectionInfo, APIService } from 'src/app/services/APIService';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IconsType, Icons } from 'src/app/components/icon/icon.component';

@Component({
  selector: 'app-page-viewer',
  templateUrl: './page-viewer.component.html',
  styleUrls: ['./page-viewer.component.scss']
})
export class PageViewerComponent implements OnInit {
  pageInfo: SectionInfo;
  active: string;
  icons: IconsType;

  constructor(private service: APIService, private router: Router, private toastr: ToastrService) {
    this.icons = Icons;
  }

  ngOnInit() {
    this.pageInfo = this.service.getCurrentPage();
    if(this.pageInfo === null) {
      this.router.navigate(['dashboard']);
    } else {
      this.active = this.pageInfo.tabs[0].label;
    }
  }

  showContent(tab: { label: string, template: string }) {
    this.active = tab.label;
  }

  onMarkDone() {
    this.service.markPageAsDone(this.pageInfo).then(res => {
      this.router.navigate(['dashboard']);
    }).catch(res => {
      this.toastr.error(res.errors[0].message, 'Error');
    })
  }

  onUnmark() {
    this.service.unmarkPageAsDone(this.pageInfo).then(res => {
      this.router.navigate(['dashboard']);
    }).catch(res => {
      this.toastr.error(res.errors[0].message, 'Error');
    })
  }
}