import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-sale-items',
  templateUrl: './sale-items.component.html',
  styleUrls: ['./sale-items.component.scss']
})
export class SaleItemsComponent implements OnInit {
  public saleItems: any[] = [];
  public saleId: number = 0;
  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) {
    this.saleId = Number(this.activatedRoute.snapshot.paramMap.get("id"))

  }

  ngOnInit(): void {
    this.getSaleItems();
  }

  private getSaleItems(): void {
    this.apiService.getSaleItems(this.saleId).subscribe({
      next: res => {
        this.saleItems = res.data;
        console.log(res);

      }
    })
  }

}
