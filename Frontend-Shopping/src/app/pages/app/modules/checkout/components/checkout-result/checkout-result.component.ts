import { Component, OnInit, Input } from '@angular/core';
import { IBasket } from 'src/app/shared/models/basket.model';

@Component({
  selector: 'app-checkout-result',
  templateUrl: './checkout-result.component.html',
  styleUrls: ['./checkout-result.component.scss']
})
export class CheckoutResultComponent implements OnInit {
  @Input() basket: IBasket[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
