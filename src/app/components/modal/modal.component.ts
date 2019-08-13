import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() title?: string = 'Notification';
  @Input() message: string;
  @Input() show?: boolean = false;
  @Input() ok?: string = 'Accept';
  @Input() cancel?: string = 'Cancel';
  @Input() showCancel?: Boolean = false;
  @Output() clickOk?: EventEmitter<any> = new EventEmitter();
  @Output() clickCancel?: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onClick(emiter: EventEmitter<any>) {
    emiter.emit(true);
  }

}

export interface ModalType {
  title?: String;
  message: String;
  show?: Boolean;
  showCancel?: Boolean;
  ok?: String;
  cancel?: String;
  clickOk?: () => void;
  clickCancel?: () => void
}