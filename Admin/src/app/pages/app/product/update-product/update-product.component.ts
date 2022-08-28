import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBrand } from 'src/app/shared/models/brand.model';
import { ICategory } from 'src/app/shared/models/category.model';
import { Pagination } from 'src/app/shared/models/pagination';
import { IProduct } from 'src/app/shared/models/product.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {


  public products: IProduct[] = [];
  public categories: ICategory[] = [];
  public brands: IBrand[] = [];
  public form: FormGroup = new FormBuilder().group({});
  public submitted: boolean = false;
  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getProducts();
    this.generateForm();
    this.getCategories();
    this.getBrands();
  }

  private generateForm(): void {
    this.form = this.fb.group({
      id: [],
      brandId: [],
      categoryId: [],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      order: ['', [Validators.required]],
      price: ['', [Validators.required]],
      rating: ['', [Validators.required]],
      isAviable: [''],
      options: [],
      photos: [],
      category: [],
      brand: [],
    });
  }

  public get formControls() {
    return this.form.controls;
  }

  public getProducts(): void {
    this.apiService.getProducts(new Pagination()).subscribe((res) => {
      this.products = res.data;
      console.log(res);
    });
  }

  public getCategories(): void {
    this.apiService.getCategories(1, 10).subscribe((res) => {
      this.categories = res.data;
      console.log(res);
    });
  }

  public getBrands(): void {
    this.apiService.getBrands().subscribe((res) => {
      this.brands = res.data;
      console.log(res);
    });
  }
  public getSelectedProduct(product: IProduct): void {
    this.form.patchValue(product);
  }
  public submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    if (this.form.value.id) {
      this.apiService.updateProduct(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => { },
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getProducts();
          this.form.reset();
          this.submitted = false;
        },
      });
    } else {
      this.apiService.createProduct(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => { },
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getProducts();
          this.form.reset();
          this.submitted = false;
        },
      });
    }
  }

  public remove(id: number): void {
    if (!confirm('Delete?')) return;
    this.apiService.removeProduct(id).subscribe({
      next: (res) => {
        console.log('sil');
      },
      error: () => { },
      complete: () => {
        this.getProducts();
      },
    });
  }

  public resetForm(): void {
    this.form.reset();
  }
}
