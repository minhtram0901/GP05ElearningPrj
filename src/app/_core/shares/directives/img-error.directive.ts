import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appImgError]'
})
export class ImgErrorDirective {

  constructor(private el: ElementRef) {

  }

  @HostListener("error") onError() {
    this.el.nativeElement.src = "https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand.png";
  }

}
