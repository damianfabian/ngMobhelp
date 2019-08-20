import { Component, OnInit, Input } from '@angular/core';

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
    this.validator = new RegExp('links|help-support|settings|info|bsn|car|mob|exit|bank|bike|housing|id|income|insurance|login|number|ovkaart|payslips|residence|schools|visa|back|back-reverse|profile')
  }

  ngOnInit() {
    this.icon = this.validator.test(this.iconSrc) ? `assets/${this.iconSrc}.svg` : "assets/mob.svg";
  }
}

export type IconsType = {
  [s: string]: string
};

export const Icons: IconsType = {
  "links": "links",
  "help": "help-support",
  "settings": "settings",
  "info": "info",
  "bsn": "bsn",
  "car": "car",
  "mob": "mob",
  "exit": "exit",
  "bank": "bank",
  "bike": "bike",
  "housing": "housing",
  "id": "id",
  "income": "income",
  "insurance": "insurance",
  "login": "login",
  "number": "number",
  "ovkaart": "ovkaart",
  "payslips": "payslips",
  "residence": "residence",
  "schools": "schools",
  "visa": "visa",
  "back": "back",
  "backReverse": "back-reverse",
  "profile": "profile"
}