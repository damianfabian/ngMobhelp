import { Component, OnInit } from '@angular/core';
import { Icons } from 'src/app/components/icon/icon.component';

@Component({
  selector: 'app-handbook',
  templateUrl: './handbook.component.html',
  styleUrls: ['./handbook.component.scss']
})
export class HandbookComponent implements OnInit {
  icons: Array<string>;
  IconList: any;

  constructor() { }

  ngOnInit() {
    this.icons = Object.keys(Icons)
    this.IconList = Icons;
  }

}
