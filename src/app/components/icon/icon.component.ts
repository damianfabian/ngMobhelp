import { Component, OnInit, Input } from '@angular/core';
import { OnMount } from '../dynamicHtml';

const ICON_SET = [
  "birth",
  "links",
  "helpSupport", 
  "settings", 
  "info", 
  "bsn",
  "document",
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
  "marriage",
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
export class IconComponent implements OnInit, OnMount {
  @Input() iconsrc!: string;
  icon: String;
  validator: RegExp;

  constructor() {
    this.validator = new RegExp(
      ICON_SET.reduce((prev, curr) => `${prev}${prev.length > 0 ? '|' : ''}^${curr}$`, '' )
    )
  }

  ngOnInit() {
    this.icon = this.validator.test(this.iconsrc) ? `assets/${this.iconsrc}.svg` : "assets/mob.svg";
  }

  dynamicOnMount(attrs: Map<String, String>, content: string, element: Element) {
    this.iconsrc = <string> attrs.get("iconsrc");
  }
}

export type IconsType = {
  [s: string]: string
};

const Icons: IconsType = {};
ICON_SET.forEach(item => Icons[item] = item);

export { Icons };