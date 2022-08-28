import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  public offers: any[] = []
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getOffers();
  }

  private getOffers(): void {
    this.apiService.getOffers().subscribe({
      next: res => {
        this.offers = res.data
      }
    })
  }

}
