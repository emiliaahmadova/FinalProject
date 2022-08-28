import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent implements OnInit {
  public products: IProduct[] = []
  public categoryId: number = 0;
  public routeChanged: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public categoryName: string = "";
  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {
    this.categoryId = Number(this.activatedRoute.snapshot.paramMap.get("id"))

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(res => {
      this.categoryId = res['id'];
      this.getCategory(res['id'])
      this.routeChanged.next(res['id']);
    })
  }

  public getFilteredProducts(products: IProduct[]) {
    this.products = products;
  }

  private getCategory(departamentId: number): void {
    this.apiService.getCategoryById(departamentId).subscribe({
      next: res => {
        this.categoryName = res.data.name
      }
    })
  }

}
