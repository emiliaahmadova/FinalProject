import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ISettingSlider } from 'src/app/shared/models/settings-slider.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-main-slider',
  templateUrl: './main-slider.component.html',
  styleUrls: ['./main-slider.component.scss']
})
export class MainSliderComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
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
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
  public mainSlider: ISettingSlider[] = []
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getSlider();
  }

  public getSlider(): void {
    this.apiService.getSliders().subscribe({
      next: res => {
        this.mainSlider = res.data;
        console.log(res);

      }
    })
  }



}
