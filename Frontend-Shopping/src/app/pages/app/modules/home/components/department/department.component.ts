import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/models/category.model';
import { IDepartment } from 'src/app/shared/models/department.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {
  public categories: ICategory[];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getDepartments();
  }

  private getDepartments(): void {
    this.apiService.getCategories().subscribe({
      next: res => {
        this.categories = res.data;
        console.log("ct", res);

      }
    })
  }

}
