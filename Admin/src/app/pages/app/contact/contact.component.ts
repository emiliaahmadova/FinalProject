import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IContact } from 'src/app/shared/models/contact.model';
import { ISetting } from 'src/app/shared/models/settings.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {


  public  contacts: IContact[] = [];
  public settings: ISetting[] = [];
  public form: FormGroup = new FormBuilder().group({});
  public submitted: boolean = false;
  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getContacts();
    this.generateForm();
    this.getSettings();
  }

  private generateForm(): void {
    this.form = this.fb.group({
      id: [],
      title: ['', [Validators.required]],
      order: ['', [Validators.required]],
      info: ['', [Validators.required]],
      content: ['', [Validators.required]],
      settingsId: [],
    });
  }

  public get formControls() {
    return this.form.controls;
  }

  public getContacts(): void {
    this.apiService.getContacts().subscribe((res) => {
      this.contacts = res.data;
      console.log(res);
    });
  }

  public getSettings(): void {
    this.apiService.getSettings().subscribe((res) => {
      this.settings = res.data;
      console.log(res);
    });
  }
  public getSelectedContact(contact: IContact): void {
    this.form.patchValue(contact);
  }
  public submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    if (this.form.value.id) {
      this.apiService.updateContact(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {},
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getContacts();
          this.form.reset();
          this.submitted = false;
        },
      });
    } else {
      this.apiService.createContact(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {},
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getContacts();
          this.form.reset();
          this.submitted = false;
        },
      });
    }
  }

  public remove(id: number): void {
    if (!confirm('Delete?')) return;
    this.apiService.removeContact(id).subscribe({
      next: (res) => {
      },
      error: () => {},
      complete: () => {
        this.getContacts();
      },
    });
  }

  public resetForm(): void {
    this.form.reset();
  }


}
