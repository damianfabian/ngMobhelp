import { Component, OnInit } from '@angular/core';
import { IconsType, Icons } from 'src/app/components/icon/icon.component';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  icons: IconsType;

  constructor() { 
    this.icons = Icons;
  }

  ngOnInit() {
  }

}
