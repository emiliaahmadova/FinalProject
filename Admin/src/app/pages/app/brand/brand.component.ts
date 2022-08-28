import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBrand } from 'src/app/shared/models/brand.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  public brands: IBrand[] = [];
  public form: FormGroup = new FormBuilder().group({});
  public fileUrl: string = null;
  public submitted: boolean = false;
  private selectedBrand: IBrand = null;
  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getBrands();
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

  public getBrands(): void {
    this.apiService.getBrands().subscribe((res) => {
      this.brands = res.data;
      console.log(res);
    });
  }
  public getSelectedBrand(brand: IBrand): void {
    this.selectedBrand = brand;
    this.form.patchValue(brand);
    this.fileUrl = brand.filePath;
  }
  public submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    if (this.form.value.id) {
      this.apiService.updateBrand(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => { },
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getBrands();
          console.log('Gonderildi');
          this.form.reset();
          this.submitted = false;
        },
      });
    } else {
      this.apiService.createBrand(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => { },
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getBrands();
          this.form.reset();
          this.submitted = false;
        },
      });
    }
  }

  public remove(id: number): void {
    if (!confirm('Delete?')) return;
    this.apiService.removeBrand(id).subscribe({
      next: (res) => {
        console.log('sil');
      },
      error: () => { },
      complete: () => {
        this.getBrands();
      },
    });
  }
  public resetForm(): void {
    this.form.reset();
    this.fileUrl = null;
    this.selectedBrand = null;
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
        if (this.selectedBrand) {
          let data = { id: this.selectedBrand.id, filePath: this.selectedBrand.filePath }
          this.apiService.removeBrandUpload(data).subscribe({
            next: res => {
              console.log(res);

            }
          })
        }
      }
    })
  }


}
