import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { IBrand } from 'src/app/shared/models/brand.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  public brands: IBrand[] = []
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
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  public getBrands(): void {
    this.apiService.getBrands().subscribe({
      next: res => {
        this.brands = res.data;
        console.log(res);

      }
    })
  }

}
