import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOffer } from 'src/app/shared/models/offer.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss'],
})
export class OfferComponent implements OnInit {
  public offers: IOffer[] = [];
  public form: FormGroup = new FormBuilder().group({});
  public fileUrl: string = null;
  public submitted: boolean = false;
  constructor(private apiService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getOffers();
    this.generateForm();
  }

  private generateForm(): void {
    this.form = this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      order: ['', [Validators.required]],
      description: ['', [Validators.required]],
      icon: [''],
      isActive: [false]
    });
  }

  public get formControls() {
    return this.form.controls;
  }

  public getOffers(): void {
    this.apiService.getOffers().subscribe((res) => {
      this.offers = res.data;
      console.log(res);
    });
  }
  public getSelectedOffer(offer: IOffer): void {
    this.form.patchValue(offer);
  }
  public submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    if (this.form.value.id) {
      this.apiService.updateOffer(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => { },
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getOffers();
          this.form.reset();
          this.submitted = false;
        },
      });
    } else {
      this.apiService.createOffer(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => { },
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getOffers();
          this.form.reset();
          this.submitted = false;
        },
      });
    }
  }

  public remove(id: number): void {
    if (!confirm('eminsizmi?')) return;
    this.apiService.removeOffer(id).subscribe({
      next: (res) => {
        console.log('sil');
      },
      error: () => { },
      complete: () => {
        this.getOffers();
      },
    });
  }

  public resetForm(): void {
    this.form.reset();
    this.fileUrl = null;
  }


  public upload($event: any): void {
    if ($event.target.files && $event.target.files[0]) {
      var formData = new FormData();
      formData.append('file', $event.target.files[0]);
      $event.target.value = '';

      this.apiService.uploadImg(formData).subscribe({
        next: (res: any) => {
          this.fileUrl = environment.storageUrl + res.src;
          this.form.get("icon")!.setValue(environment.storageUrl + res['src']);
        },
        error: (err) => { },
        complete: () => {
        },
      });
    }
  }

  public removeUpload(): void {
    this.apiService.removeUpload(this.form.get("icon").value).subscribe({
      next: (res) => {
        console.log(res);

      }, error: () => { }, complete: () => {
        this.fileUrl = null;
        this.form.get("filePath")!.setValue(null);
      }
    })
  }
}
