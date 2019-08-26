import { Component, OnInit } from '@angular/core';
import { IconsType, Icons } from 'src/app/components/icon/icon.component';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent implements OnInit {
  icons: IconsType;
  constructor() { 
    this.icons = Icons;
  }

  ngOnInit() {
  }

}
