import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public sales: any[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getSales();
  }

  private getSales(): void {
    this.apiService.getSales().subscribe({
      next: res => {
        this.sales = res.data;
        console.log(res);

      }
    })
  }

}
