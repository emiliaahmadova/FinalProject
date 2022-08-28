import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategory } from 'src/app/shared/models/category.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  public categories: ICategory[] = [];
  public form: FormGroup = new FormBuilder().group({});
  public submitted: boolean = false;
  public fileUrl: string = null;
  public selectedCategory: ICategory = null;
  constructor(private apiService: ApiService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.getCategories();
    this.generateForm();
  }

  private generateForm(): void {
    this.form = this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      order: ['', [Validators.required]],
      filePath: [''],
    });
  }

  public get formControls() {
    return this.form.controls;
  }

  public getCategories(): void {
    this.apiService.getCategories(1, 10).subscribe((res) => {
      this.categories = res.data;
      console.log(res);
    });
  }
  public getSelectedCategory(category: ICategory): void {
    this.form.patchValue(category);
    this.fileUrl = category.filePath;
  }

  public submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    if (this.form.value.id) {
      this.apiService.updateCategory(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => { },
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getCategories();
          this.form.reset();
          this.submitted = false;
        },
      });
    } else {
      this.apiService.createCategory(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => { },
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getCategories();
          this.form.reset();
          this.submitted = false;
        },
      });
    }
  }

  public remove(id: number): void {
    if (!confirm('eminsizmi?')) return;
    this.apiService.removeCategory(id).subscribe({
      next: (res) => {
        console.log('sil');
      },
      error: () => { },
      complete: () => {
        this.getCategories();
      },
    });
  }

  public resetForm(): void {
    this.form.reset();
    this.fileUrl = null;
    this.selectedCategory = null;
  }


  public upload($event: any): void {
    if ($event.target.files && $event.target.files[0]) {
      var formData = new FormData();
      formData.append('file', $event.target.files[0]);
      $event.target.value = '';

      this.apiService.uploadImg(formData).subscribe({
        next: (res: any) => {
          this.fileUrl = environment.storageUrl + res.src;
          this.form.get("filePath")!.setValue(environment.storageUrl + res['src']);
        },
        error: (err) => { },
        complete: () => {
        },
      });
    }
  }

  public removeUpload(): void {
    this.apiService.removeUpload(this.form.get("filePath").value).subscribe({
      next: (res) => {
        console.log(res);

      }, error: () => { }, complete: () => {
        this.fileUrl = null;
        this.form.get("filePath")!.setValue(null);
        if (this.selectedCategory) {
          let data = { id: this.selectedCategory.id, filePath: this.selectedCategory.filePath }
          this.apiService.removeCategoryUpload(data).subscribe({
            next: res => {
              console.log(res);

            }
          })
        }
      }
    })
  }
}
