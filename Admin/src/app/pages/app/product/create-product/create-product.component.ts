import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBrand } from 'src/app/shared/models/brand.model';
import { ICategory } from 'src/app/shared/models/category.model';
import { IDepartment } from 'src/app/shared/models/department.model';
import { Pagination } from 'src/app/shared/models/pagination';
import { IProduct } from 'src/app/shared/models/product.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {


  public products: IProduct[] = [];
  public categories: ICategory[] = [];
  public departments: IDepartment[] = [];
  public brands: IBrand[] = [];
  public form: FormGroup = new FormBuilder().group({});
  public submitted: boolean = false;
  public fileUrl: string = null;
  public photosForm: FormGroup = new FormBuilder().group({});
  public order = 1;
  private productId: number = 0;

  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get("id"))
    this.getCategories();
    this.getDepartments();
  }

  ngOnInit(): void {
    this.getProducts();
    this.generateForm();
    this.getBrands();
    this.photosFormArray.removeAt(0)
    if (this.productId) {
      this.getProductById()
    }
  }

  private generateForm(): void {
    this.form = this.fb.group({
      id: [],
      brandId: [],
      categoryId: [],
      departmentId: [, Validators.required],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      order: ['', [Validators.required]],
      price: ['', [Validators.required]],
      isAviable: ['', [Validators.required]],
      options: [],
      category: [],
      brand: [],
      photos: new FormArray([new FormGroup({
        filePath: new FormControl(''),
        order: new FormControl('')
      })]),
    });
  }

  public getProductById(): void {
    this.apiService.getProductById(Number(this.productId)).subscribe({
      next: (res) => {

        this.form.patchValue(res.data)
        this.order = res.data.photos.length > 0 ? res.data.photos[res.data.photos.length - 1].order + 1 : 1
        res.data.photos.forEach(e => {
          this.photosFormArray.push(this.addPhoto(e.filePath, e.order))
        })
      }
    })
  }


  private addPhoto(filePath, order): FormGroup {
    return this.fb.group({
      filePath: filePath,
      order: order,
      productId: this.productId
    })
  }

  get photosFormArray() {
    return this.form.get('photos') as FormArray
  }

  get photos() {
    return this.form.controls["photos"] as FormArray;
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
  public getDepartments(): void {
    this.apiService.getDepartments().subscribe((res) => {
      this.departments = res.data;
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
    console.log(this.form.value);

    if (this.form.invalid) return;
    if (this.form.value.id) {
      this.apiService.updateProduct(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => { },
        complete: () => {
          this.router.navigate(['/product'])

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
          this.router.navigate(['/product'])

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

  public upload($event: any): void {
    if ($event.target.files && $event.target.files[0]) {
      var formData = new FormData();
      formData.append('file', $event.target.files[0]);
      $event.target.value = '';

      this.apiService.uploadImg(formData).subscribe({
        next: (res: any) => {
          this.photosFormArray.push(this.addPhoto(environment.storageUrl + res['src'], this.order))
          // this.fileUrl = environment.storageUrl + res.src;
          // this.form.get("filePath")!.setValue(environment.storageUrl + res['src']);
        },
        error: (err) => { },
        complete: () => {
          this.order++;
        },
      });
    }
  }

  public removeUpload(photo: any, index: number): void {
    console.log(photo);
    this.apiService.removeUpload(photo.filePath).subscribe({
      next: (res) => {


      }, error: () => { }, complete: () => {
        this.photosFormArray.removeAt(index)
        if (photo.id) {
          this.apiService.removeProductPhoto(photo.id).subscribe({
            next: (res) => {


            }, error: () => { }, complete: () => {
              this.photosFormArray.removeAt(index)

            }
          })
        }

      }
    })


  }

}
