import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
  public products: IProduct[] = []
  private departmentId: number = 0;

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {
    this.departmentId = Number(this.activatedRoute.snapshot.paramMap.get("id"))

  }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    this.apiService.getFilteredProduct().subscribe({
      next: res => {
        this.products = res.data
      }
    })
  }

  public getFilteredProducts(products: IProduct[]) {
    this.products = products;
  }

}
