import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBrand } from '../../models/brand.model';
import { ICategory } from '../../models/category.model';
import { IDepartment } from '../../models/department.model';
import { FilterOptions } from '../../models/filter-options';
import { IProduct } from '../../models/product.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  public brands: IBrand[] = [];
  public departments: IDepartment[] = [];
  public categories: ICategory[] = [];
  private selectedDepartments: number[] = [];
  private selectedCategories: number[] = [];
  private selectedBrands: number[] = [];
  public filterOptions: FilterOptions = new FilterOptions(null);
  @Input() selectedDepartmentId: number = 0;
  @Input() selectedCategoryId: number = 0;
  @Output() filteredProductsEvent: EventEmitter<IProduct[]> = new EventEmitter<IProduct[]>(null);
  @Input() routeChanged: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getDepartments();
    this.getCategories();
    this.routeChanged.subscribe(res => {
      if (this.selectedDepartmentId == 0) {
        this.selectedCategoryId = res
      } else {
        this.selectedDepartmentId = res;
      }
      // this.selectedDepartmentId = res;
      // this.selectedDepartmentId = res;
      this.reset();
    })
  }

  private getBrands(): void {
    this.apiService.getBrands().subscribe({
      next: res => {
        this.brands = res.data;
      }
    })
  }
  private getDepartments(): void {
    this.apiService.getDepartments().subscribe({
      next: res => {
        this.departments = res.data;
      }
    })
  }

  private getCategories(): void {
    this.apiService.getCategories().subscribe({
      next: res => {
        this.categories = res.data;
      }
    })
  }

  public getDepartmentsValue(id: number) {
    if (this.selectedDepartments.find(e => e == id)) {
      this.selectedDepartments = this.selectedDepartments.filter(e => e != id)
    } else {
      this.selectedDepartments.push(id);
    }
  }
  public getCategoriesValue(id: number) {
    if (this.selectedCategories.find(e => e == id)) {
      this.selectedCategories = this.selectedCategories.filter(e => e != id)
    } else {
      this.selectedCategories.push(id);
    }
  }
  public getBrandValue(id: number) {
    if (this.selectedBrands.find(e => e == id)) {
      this.selectedBrands = this.selectedBrands.filter(e => e != id)
    } else {
      this.selectedBrands.push(id);
    }
  }
  public search(): void {
    this.filterOptions.brandId = this.selectedBrands;
    this.filterOptions.categoryId = this.selectedCategories;
    this.filterOptions.departmentId = this.selectedDepartments;
    this.apiService.getFilteredProduct(this.filterOptions).subscribe({
      next: res => {
        this.filteredProductsEvent.emit(res.data)
      }
    })


  }

  public reset(): void {
    this.filterOptions = new FilterOptions(null)
    this.selectedBrands = [];
    this.selectedCategories = [];
    this.selectedDepartments = [];

    if (this.selectedDepartmentId != 0) {
      this.selectedDepartments.push(this.selectedDepartmentId)
    }
    if (this.selectedCategoryId != 0) {
      this.selectedCategories.push(this.selectedCategoryId)

    }
    document.querySelector("#max")['value'] = null;
    document.querySelector("#min")['value'] = null;
    Array.from(document.querySelectorAll('input[type=checkbox]')).forEach(el => el['checked'] = false);
    this.search()
  }

}
