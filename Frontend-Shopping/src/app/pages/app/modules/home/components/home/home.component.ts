import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProductSlider } from 'src/app/shared/models/product-slider.model';
import { ISetting } from 'src/app/shared/models/settings.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public productsSliderSecond: IProductSlider = null;
  public productsSliderThird: IProductSlider = null;

  constructor() {
    setTimeout(() => {
      this.getSliders()

    }, 400);

  }

  ngOnInit(): void {
  }

  private async getSliders() {
    let setting = JSON.parse(sessionStorage.getItem('setting')) as ISetting
    this.productsSliderSecond = setting.productSliders.find(e => e.order == 2) ?? null;
    this.productsSliderThird = setting.productSliders.find(e => e.order == 3) ?? null;
    console.log(this.productsSliderSecond.productSliderItems);
  }
}
