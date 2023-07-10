import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[uppercaseText]'
})
export class UppercaseDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input') onInput() {
    const value: string = this.el.nativeElement.value;
    this.el.nativeElement.value = value.toUpperCase();
  }
}
