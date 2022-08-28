import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pagination } from 'src/app/shared/models/pagination';
import { IProductSlider } from 'src/app/shared/models/product-slider.model';
import { IProduct } from 'src/app/shared/models/product.model';
import { ISetting } from 'src/app/shared/models/settings.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent implements OnInit {


  public productSliders: IProductSlider[] = [];
  public products: IProduct[] = [];
  public settings: ISetting[] = [];
  public form: FormGroup = new FormBuilder().group({});
  public submitted: boolean = false;
  public sliderItemsForm: FormGroup = new FormBuilder().group({});
  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getProducts();
    this.getProductSliders();
    this.generateForm();
    this.getSettings();
  }

  private generateForm(): void {
    this.form = this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      order: ['', [Validators.required]],
      code: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      settingsId: [],
      productSliderItems: this.fb.array([]),
    });
    this.addSliderItemForm();
  }

  public addSliderItemForm(): void {
    this.sliderItemsForm = this.fb.group({
      productId: [],
    })
    this.sliderItemsFormArray.push(this.sliderItemsForm);
  }

  public get sliderItemsFormArray() {
    return this.form.controls["productSliderItems"] as FormArray
  }

  public get formControls() {
    return this.form.controls;
  }

  public getProductSliders(): void {
    this.apiService.getProductSliders().subscribe((res) => {
      this.productSliders = res.data;
      console.log(res);
    });
  }

  public getProducts(): void {
    let pagination: Pagination;
    pagination.pageSize = 150;
    this.apiService.getProducts(new Pagination()).subscribe((res) => {
      this.products = res.data;
      console.log(res);
    });
  }

  public getSettings(): void {
    this.apiService.getSettings().subscribe((res) => {
      this.settings = res.data;
      console.log(res);
    });
  }
  public getSelectedProductSlider(productSlider: IProductSlider): void {
    this.form.patchValue(productSlider);
  }
  public submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    if (this.form.value.id) {
      this.apiService.updateProductSlider(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => { },
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getProductSliders();
          this.form.reset();
          this.submitted = false;
        },
      });
    } else {
      this.apiService.createProductSlider(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => { },
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getProductSliders();
          this.form.reset();
          this.submitted = false;
        },
      });
    }
  }

  public remove(id: number): void {
    if (!confirm('eminsizmi?')) return;
    this.apiService.removeProductSlider(id).subscribe({
      next: (res) => {
        console.log('sil');
      },
      error: () => { },
      complete: () => {
        this.getProductSliders();
      },
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

}
