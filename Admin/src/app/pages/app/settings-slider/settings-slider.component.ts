import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDepartment } from 'src/app/shared/models/department.model';
import { ISettingSlider } from 'src/app/shared/models/settings-slider.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings-slider',
  templateUrl: './settings-slider.component.html',
  styleUrls: ['./settings-slider.component.scss'],
})
export class SettingsSliderComponent implements OnInit {
  public sliders: ISettingSlider[] = [];
  public form: FormGroup = new FormBuilder().group({});
  public submitted: boolean = false;
  public fileUrl: string = null;
  public selectedSlider: ISettingSlider = null;

  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getSliders();
    this.generateForm();
  }

  private generateForm(): void {
    this.form = this.fb.group({
      id: [],
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      content: ['', [Validators.required]],
      order: ['', [Validators.required]],
      filePath: [''],
    });
  }

  public get formControls() {
    return this.form.controls;
  }

  public getSliders(): void {
    this.apiService.getSliders().subscribe((res) => {
      this.sliders = res.data;
      console.log(res);
    });
  }


  public getSelectedSlider(slider: ISettingSlider): void {
    this.form.patchValue(slider);
    this.selectedSlider = slider;
    this.fileUrl = slider.filePath;
  }

  public submit(): void {
    console.log(this.form.value);

    this.submitted = true;
    if (this.form.invalid) return;
    if (this.form.value.id) {
      this.apiService.updateSlider(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => { },
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getSliders();
          this.form.reset();
          this.submitted = false;
        },
      });
    } else {
      this.apiService.createSlider(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => { },
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getSliders();
          this.form.reset();
          this.submitted = false;
        },
      });
    }
  }

  public remove(id: number): void {
    if (!confirm('Delete?')) return;
    this.apiService.removeSlider(id).subscribe({
      next: (res) => {
        console.log('sil');
      },
      error: () => { },
      complete: () => {
        this.getSliders();
      },
    });
  }

  public resetForm(): void {
    this.form.reset();
    this.fileUrl = null;
    this.selectedSlider = null;
  }
  public removeUpload(): void {
    this.apiService.removeUpload(this.form.get("filePath").value).subscribe({
      next: (res) => {
        console.log(res);

      }, error: () => { }, complete: () => {
        this.fileUrl = null;
        this.form.get("filePath")!.setValue(null);
        if (this.selectedSlider) {
          let data = { id: this.selectedSlider.id, filePath: this.selectedSlider.filePath }
          this.apiService.removeSliderUpload(data).subscribe({
            next: res => {
              console.log(res);

            }
          })
        }
      }
    })
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
}
