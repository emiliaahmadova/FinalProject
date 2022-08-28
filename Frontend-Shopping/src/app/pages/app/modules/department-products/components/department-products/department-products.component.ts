import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from 'src/app/shared/models/product.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-department-products',
  templateUrl: './department-products.component.html',
  styleUrls: ['./department-products.component.scss']
})
export class DepartmentProductsComponent implements OnInit {
  public products: IProduct[] = []
  public departmentId: number = 0;

  public routeChanged: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public departamentName: string = "";
  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {
    this.departmentId = Number(this.activatedRoute.snapshot.paramMap.get("id"))

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(res => {
      this.departmentId = res['id'];
      this.routeChanged.next(res['id']);
      this.getDepartament(res['id']);
    })
  }

  public getFilteredProducts(products: IProduct[]) {
    this.products = products;
  }

  private getDepartament(departamentId: number): void {
    this.apiService.getDepartmentById(departamentId).subscribe({
      next: res => {
        this.departamentName = res.data.name
      }
    })
  }

}
