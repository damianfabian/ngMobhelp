import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[renderHTML]',
})
export class renderHTMLDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
