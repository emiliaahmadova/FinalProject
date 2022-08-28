import { Component, Input, OnInit } from '@angular/core';
import { IBasket } from 'src/app/shared/models/basket.model';

@Component({
  selector: 'app-note-area',
  templateUrl: './note-area.component.html',
  styleUrls: ['./note-area.component.scss']
})
export class NoteAreaComponent implements OnInit {
  @Input() basket: IBasket[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
