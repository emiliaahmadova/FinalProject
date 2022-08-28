import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-content',
  templateUrl: './about-content.component.html',
  styleUrls: ['./about-content.component.scss']
})
export class AboutContentComponent implements OnInit {
  @Input() aboutContent: any;
  constructor() { }

  ngOnInit(): void {
  }

}
