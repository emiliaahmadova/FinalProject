import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISetting } from 'src/app/shared/models/settings.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public settings: ISetting[] = [];
  public form: FormGroup = new FormBuilder().group({});
  public submitted: boolean = false;
  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getSettings();
    this.generateForm();
  }

  private generateForm(): void {
    this.form = this.fb.group({
      id: [],
      privacyPolicy: ['', [Validators.required]],
      order: ['', [Validators.required]],
    });
  }

  public get formControls() {
    return this.form.controls;
  }

  public getSettings(): void {
    this.apiService.getSettings().subscribe((res) => {
      this.settings = res.data;
      console.log(res);
    });
  }
  public getSelectedSetting(setting: ISetting): void {
    this.form.patchValue(setting);
  }
  public submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    if (this.form.value.id) {
      this.apiService.updateSetting(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {},
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getSettings();
          this.form.reset();
          this.submitted = false;
        },
      });
    } else {
      this.apiService.createSetting(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {},
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getSettings();
          this.form.reset();
          this.submitted = false;
        },
      });
    }
  }

  public remove(id: number): void {
    if (!confirm('Delete?')) return;
    this.apiService.removeSetting(id).subscribe({
      next: (res) => {
        console.log('sil');
      },
      error: () => {},
      complete: () => {
        this.getSettings();
      },
    });
  }

  public resetForm(): void {
    this.form.reset();
  }
}
