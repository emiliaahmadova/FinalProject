import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDepartment } from 'src/app/shared/models/department.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  public departments: IDepartment[] = [];
  public form: FormGroup = new FormBuilder().group({});
  public submitted: boolean = false;
  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getDepartments();
    this.generateForm();
  }

  private generateForm(): void {
    this.form = this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      order: ['', [Validators.required]],
      filePath: [''],
      categories: [],
    });
  }

  public get formControls() {
    return this.form.controls;
  }

  public getDepartments(): void {
    this.apiService.getDepartments().subscribe((res) => {
      this.departments = res.data;
      console.log(res);
    });
  }
  public getSelectedDepartment(department: IDepartment): void {
    this.form.patchValue(department);
  }
  public submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    if (this.form.value.id) {
      this.apiService.updateDepartment(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {},
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getDepartments();
          this.form.reset();
          this.submitted = false;
        },
      });
    } else {
      this.apiService.createDepartment(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {},
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getDepartments();
          this.form.reset();
          this.submitted = false;
        },
      });
    }
  }

  public remove(id: number): void {
    if (!confirm('eminsizmi?')) return;
    this.apiService.removeDepartment(id).subscribe({
      next: (res) => {
        console.log('sil');
      },
      error: () => {},
      complete: () => {
        this.getDepartments();
      },
    });
  }

  public resetForm(): void {
    this.form.reset();
  }
}
