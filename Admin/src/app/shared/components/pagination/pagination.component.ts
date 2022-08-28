import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from '../../models/pagination';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  public nextPageNumber: number = 1;
  public currentPage: number = 1;
  public pages: number[] = [];
  public pagination: Pagination = new Pagination();
  public totalPage: number;
  public removeData: boolean;
  public showedPages: number[] = [1];
  @Input() id: number;
  @Input() totalDataCount: number;
  @Output() changeData = new EventEmitter<any>();

  @Input() set removeDataInput(removeData: boolean) {
    // this.refreshDataRemove(removeData);
  }

  @Input() endpoint: string;
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTotalPage();
    this.selectShowedPages();
  }

  private getTotalPage(): void {
    this.totalPage = Math.ceil(this.totalDataCount / this.pagination.pageSize);
    for (let i = 1; i <= Number(Math.ceil(this.totalPage).toFixed()); i++) {
      this.pages.push(i);
    }
  }

  private getData(page?: number) {
    if (page == null) {
      this.apiService.getData(this.endpoint).subscribe(res => {
        this.totalPage = Math.ceil(res["count"] / this.pagination.pageSize);
        this.changeData.emit(res["data"]);
      });
    } else {
      this.apiService.getData(this.endpoint, page, this.pagination.pageSize).subscribe(res => {
        this.totalPage = Math.ceil(res["count"] / this.pagination.pageSize);
        this.changeData.emit(res["data"]);
      });
    }
  }
  public previousPage($event: any): void {
    $event.preventDefault();
    if (this.nextPageNumber != 1) {
      this.nextPageNumber -= 1;
      this.currentPage = this.nextPageNumber;
      this.selectShowedPages();

      this.getData(this.nextPageNumber);
    }
  }
  public nextPage($event: any): void {
    $event.preventDefault();
    if (this.nextPageNumber < this.pages.length) {
      this.nextPageNumber += 1;
      this.currentPage = this.nextPageNumber;
      this.selectShowedPages();

      this.getData(this.nextPageNumber);
    }
  }

  public getByNumberPage(page: number): void {
    this.currentPage = page;
    this.nextPageNumber = page;
    this.selectShowedPages();
    this.getData(page);
  }
  public getAll($event: Event) {
    $event.preventDefault();
    this.getData();
  }
  private selectShowedPages(): void {
    if (this.currentPage == 1) {
      this.showedPages = this.pages.slice(this.currentPage - 1, this.currentPage + 3);
    } else if (this.currentPage == this.pages[this.pages.length - 2]) {
      this.showedPages = this.pages.slice(this.currentPage - 3, this.currentPage + 1);
    } else if (this.currentPage == this.pages[this.pages.length - 1]) {
      this.showedPages = this.pages.slice(this.currentPage - 4, this.currentPage + 1);
    } else {
      this.showedPages = this.pages.slice(this.currentPage - 2, this.currentPage + 2);
    }
  }


}
