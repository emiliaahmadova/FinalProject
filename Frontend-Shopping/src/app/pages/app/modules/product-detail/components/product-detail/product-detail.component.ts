import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  public product: IProduct = null
  private productId: number = 0;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(res => {
      this.productId = res['id'];
      this.getProduct();
    })

  }

  ngOnInit(): void {
    this.getProduct();
  }

  private getProduct(): void {
    this.apiService.getProductById(this.productId).subscribe({
      next: res => {
        this.product = res.data
        console.log("neeee", res.data);

      }
    })
  }

}
