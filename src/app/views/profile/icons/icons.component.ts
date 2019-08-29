import { Component, OnInit } from '@angular/core';
import { Icons } from 'src/app/components/icon/icon.component';

@Component({
  selector: 'app-viewicons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class ViewIconsComponent implements OnInit {
  icons: Array<string>;
  IconList: any;

  constructor() { }

  ngOnInit() {
    this.icons = Object.keys(Icons)
    this.IconList = Icons;
  }

}
