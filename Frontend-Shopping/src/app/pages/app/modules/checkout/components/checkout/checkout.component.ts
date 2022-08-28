import { Component, OnInit } from '@angular/core';
import { IBasket } from 'src/app/shared/models/basket.model';
import { IUserModel } from 'src/app/shared/models/user.model';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
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
