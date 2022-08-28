import { Component, Input, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IBasket } from 'src/app/shared/models/basket.model';
import { IProduct } from 'src/app/shared/models/product.model';
import { BasketService } from 'src/app/shared/services/basket.service';
import { ProductOptionType } from './product-option-type';
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit {
  public product: IProduct = null;

  @Input() set inputProduct(product: IProduct) {
    this.product = product;
    this.basket = this.basketService.getBaskets();

    if (this.basket) {

      if (this.basket.find(e => e.product.id == this.product?.id)) this.isAdded = true;
    }
  }
  public productOptionType = ProductOptionType;
  public size: any = null;
  public color: any = null;
  public isAdded: boolean = false;
  public basket: IBasket[] = [];
  public bigImg: string = null;

  constructor(private basketService: BasketService, private notifier: NotifierService) {
  }

  ngOnInit(): void {
  }
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
        items: 4
      },
      400: {
        items: 4
      },
      740: {
        items: 4
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  public addToBasket(product: IProduct): void {
    if (this.size && this.color) {
      this.basketService.addToBasket(product, this.size.value, this.color.value);
      this.isAdded = true;
    } else {
      this.notifier.notify("warning", "Select size and Color")
    }
  }

  public getSize(size: any): void {
    this.size = size;
  }
  public getBigImg(filePath: string): void {
    this.bigImg = filePath;
  }
  public getColor(color: any): void {
    this.color = color;
  }
}
