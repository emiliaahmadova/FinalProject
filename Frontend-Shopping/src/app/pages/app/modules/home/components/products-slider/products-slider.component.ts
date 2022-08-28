import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IProductSliderItem } from 'src/app/shared/models/produc-slider-item.model';
import { IProductSlider } from 'src/app/shared/models/product-slider.model';

@Component({
  selector: 'app-products-slider',
  templateUrl: './products-slider.component.html',
  styleUrls: ['./products-slider.component.scss'],
})
export class ProductsSliderComponent implements OnInit {
  @Input() producstSlider: IProductSlider = null;


  constructor() { }

  ngOnInit(): void { }
  customOptions: OwlOptions = {
    loop: true,
    center: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
}
