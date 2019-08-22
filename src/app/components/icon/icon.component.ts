import { Component, OnInit, Input } from '@angular/core';

const ICON_SET = [
  "links", 
  "helpSupport", 
  "settings", 
  "info", 
  "bsn", 
  "car", 
  "mob", 
  "exit", 
  "bank", 
  "bike", 
  "housing", 
  "id", 
  "income", 
  "insurance", 
  "login", 
  "number", 
  "ovkaart", 
  "payslips", 
  "residence", 
  "schools", 
  "visa", 
  "back", 
  "backReverse", 
  "profile", 
  "search", 
  "check"
]
@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() iconSrc!: string;
  icon: String;
  validator: RegExp;

  constructor() {
    this.validator = new RegExp(
      ICON_SET.reduce((prev, curr) => `${prev}${prev.length > 0 ? '|' : ''}^${curr}$`, '' )
    )
  }

  ngOnInit() {
    this.icon = this.validator.test(this.iconSrc) ? `assets/${this.iconSrc}.svg` : "assets/mob.svg";
  }
}

export type IconsType = {
  [s: string]: string
};

const Icons: IconsType = {};
ICON_SET.forEach(item => Icons[item] = item);

export { Icons };