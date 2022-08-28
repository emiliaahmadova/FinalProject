import { Component, OnInit } from '@angular/core';
import { IBasket } from 'src/app/shared/models/basket.model';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public basket: IBasket[] = [];
  constructor(private basketService: BasketService) {
    this.basket = this.basketService.getBaskets();

  }


  ngOnInit(): void {
  }
  public removeBasket(productId: number): void {
    this.basketService.removeBasket(productId)
    this.basket = this.basketService.getBaskets();
  }

}
