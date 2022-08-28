import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IBasket } from 'src/app/shared/models/basket.model';
import { IUserModel } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { BasketService } from 'src/app/shared/services/basket.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent implements OnInit {
  private totalPrice = 0;
  private basket: IBasket[] = [];
  @Input() set inputBasket(basket: IBasket[]) {
    this.basket = basket;
    basket.forEach(e => {
      this.totalPrice = e.count * e.product.price;
    })
  }
  public user: IUserModel = null;
  public form: FormGroup;
  public submitted: boolean = false;
  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private notifier: NotifierService,
    private router: Router,
    private basketService: BasketService) {
    this.user = JSON.parse(localStorage.getItem('user')) as IUserModel;
  }

  ngOnInit(): void {
    this.generateForm();
  }

  private generateForm(): void {
    this.form = this.fb.group({
      userId: [this.user?.id],
      totalSalePrice: [this.totalPrice],
      adress: ['', [Validators.required]],
      note: ['', [Validators.required]],
      saleItems: this.fb.array([]),
    })
    this.basket.forEach(basketItem => {
      this.addOptionForm(basketItem)
    })
  }
  public addOptionForm(basket: IBasket): void {
    let saleItemsForm = this.fb.group({
      productId: [basket.product.id,],
      count: [basket.count,],
      price: [basket.product.price,],
      color: [basket.color],
      size: [basket.size]
    })
    this.saleItemsFormArray.push(saleItemsForm);
  }

  public get saleItemsFormArray() {
    return this.form.controls["saleItems"] as FormArray
  }

  public get f() {
    return this.form.controls;
  }

  public pay(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    this.apiService.sale(this.form.value).subscribe({
      next: res => {
        console.log(res);

      }, error: () => { }, complete: () => {
        this.submitted = false;
        this.basketService.removeBasketAll();
        this.notifier.notify("success", "Order Completed")
        this.router.navigate([''])
      }
    })

  }

}
