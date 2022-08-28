import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-discover-button',
  templateUrl: './discover-button.component.html',
  styleUrls: ['./discover-button.component.scss']
})
export class DiscoverButtonComponent implements OnInit {
  @Input() link: string = ""
  constructor() { }

  ngOnInit(): void {
  }

}
