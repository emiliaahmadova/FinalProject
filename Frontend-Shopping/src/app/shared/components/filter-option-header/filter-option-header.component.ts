import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-option-header',
  templateUrl: './filter-option-header.component.html',
  styleUrls: ['./filter-option-header.component.scss']
})
export class FilterOptionHeaderComponent implements OnInit {
  @Input() filterTitle: string = ""
  constructor() { }

  ngOnInit(): void {
  }

}
