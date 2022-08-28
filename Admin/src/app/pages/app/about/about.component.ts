import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAbout } from 'src/app/shared/models/about.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  public abouts: IAbout[] = [];
  public form: FormGroup = new FormBuilder().group({});
  public submitted: boolean = false;
  public fileUrl: string = null;
  public about: any;
  fileToUpload: File | null = null;
  public selectedAbout: IAbout = null;
  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAbouts();
    this.generateForm();
  }

  private generateForm(): void {
    this.form = this.fb.group({
      id: [],
      content: ['', [Validators.required]],
      order: ['', [Validators.required]],
      filePath: [''],
      isActive: [false, [Validators.required]]
    });
  }

  public get formControls() {
    return this.form.controls;
  }

  public getAbouts(): void {
    this.apiService.getAbouts().subscribe((res) => {
      this.abouts = res.data;
      console.log(res);
    });
  }
  public getSelectedAbout(about: IAbout): void {
    this.form.patchValue(about);
    this.fileUrl = about.filePath;
  }
  public submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    if (this.form.value.id) {
      this.apiService.updateAbout(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => { },
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getAbouts();
          this.form.reset();
          this.submitted = false;
        },
      });
    } else {
      this.apiService.createAbout(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => { },
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getAbouts();
          this.form.reset();
          this.submitted = false;
        },
      });
    }
  }

  public remove(id: number): void {
    if (!confirm('Delete?')) return;
    this.apiService.removeAbout(id).subscribe({
      next: (res) => {
      },
      error: () => { },
      complete: () => {
        this.getAbouts();
      },
    });
  }

  public resetForm(): void {
    this.form.reset();
    this.fileUrl = null;
    this.selectedAbout = null;
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
        if (this.selectedAbout) {
          let data = { id: this.selectedAbout.id, filePath: this.selectedAbout.filePath }
          this.apiService.removeAboutUpload(data).subscribe({
            next: res => {
              console.log(res);

            }
          })
        }
      }
    })
  }

}

