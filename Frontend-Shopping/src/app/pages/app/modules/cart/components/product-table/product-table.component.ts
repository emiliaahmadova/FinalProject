import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBasket } from 'src/app/shared/models/basket.model';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss']
})
export class ProductTableComponent implements OnInit {
  @Input() basket: IBasket[] = [];
  @Output() removeBaskeEvent: EventEmitter<number> = new EventEmitter<number>()
  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }

  public removeItem(productId: number): void {
    this.removeBaskeEvent.emit(productId)
  }

}
