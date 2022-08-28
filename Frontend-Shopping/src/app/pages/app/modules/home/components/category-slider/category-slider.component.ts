import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ICategory } from 'src/app/shared/models/category.model';
import { IProductSlider } from 'src/app/shared/models/product-slider.model';
import { IProduct } from 'src/app/shared/models/product.model';
import { ISetting } from 'src/app/shared/models/settings.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.scss']
})
export class CategorySliderComponent implements OnInit {
  public categories: ICategory[];
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
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 2
      }
    },
    nav: false
  }
  public productsSlider: IProductSlider = null;


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    setTimeout(() => {
      let setting = JSON.parse(sessionStorage.getItem('setting')) as ISetting
      this.productsSlider = setting.productSliders.find(e => e.order == 1);
      console.log(this.productsSlider.productSliderItems);
    }, 400);

    this.getDepartments();
  }
  private getDepartments(): void {
    this.apiService.getCategories().subscribe({
      next: res => {
        this.categories = res.data;
        console.log("ct", res);

      }
    })
  }
}
