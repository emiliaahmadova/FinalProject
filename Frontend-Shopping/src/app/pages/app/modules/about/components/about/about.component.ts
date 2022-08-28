import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public about: any;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAbout();
  }

  private getAbout(): void {
    this.apiService.getAbout().subscribe({
      next: res => {
        console.log(res);

        this.about = res.data
      }
    })
  }

}
