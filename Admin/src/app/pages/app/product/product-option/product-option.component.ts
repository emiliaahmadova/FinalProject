import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductOptionType } from 'src/app/shared/models/product-option-type.enum';
import { IProductOption, IProductOptionItem } from 'src/app/shared/models/product-option.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-product-option',
  templateUrl: './product-option.component.html',
  styleUrls: ['./product-option.component.scss']
})
export class ProductOptionComponent implements OnInit {
  private productId: number = 0;
  public productOptions: IProductOption[] = [];
  public form: FormGroup = new FormBuilder().group({});
  public optionForm: FormGroup = new FormBuilder().group({});
  public submitted: boolean = false;
  public selectedProductOption: IProductOption = null;
  public productOptionType = ProductOptionType;
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private fb: FormBuilder) {
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get("id"))
    console.log(this.activatedRoute.snapshot.paramMap.get("id"));


  }

  ngOnInit(): void {
    this.getProductOptions();
    this.generateForm();
  }


  private generateForm(): void {
    this.form = this.fb.group({
      id: [],
      productId: [this.productId],
      title: ['', [Validators.required]],
      sku: ['', [Validators.required]],
      order: ['', [Validators.required]],
      type: [, [Validators.required]],
      productOptionItems: this.fb.array([]),

    });
    this.addOptionForm()
  }

  public get formControls() {
    return this.form.controls;
  }

  public addOptionForm(optionItem?: IProductOptionItem): void {
    if (optionItem) {
      this.optionForm = this.fb.group({
        id: [optionItem.id],
        order: [optionItem.order,],
        value: [optionItem.value,],
        productOptionId: [optionItem.productOptionId],
      })
    } else {
      this.optionForm = this.fb.group({
        order: ["",],
        value: [""],
      })
    }

    this.optionFormArray.push(this.optionForm);
  }

  public get optionFormArray() {
    return this.form.controls["productOptionItems"] as FormArray
  }

  public getProductOptions(): void {
    this.apiService.getProductOptions().subscribe((res) => {
      this.productOptions = res.data;
      console.log(res);
    });
  }
  public getSelectedProductOption(productOption: IProductOption): void {
    this.optionFormArray.reset();
    this.optionFormArray.clear();
    this.optionForm.reset();
    this.form.patchValue(productOption);
    productOption.productOptionItems.forEach(e => {
      this.addOptionForm(e)
    })

  }
  public submit(): void {
    this.submitted = true;
    this.form.get("productId").setValue(this.productId)
    this.form.get("type").setValue(Number(this.form.get("type").value))
    if (this.form.invalid) return;
    if (this.form.value.id) {
      this.apiService.updateProductOption(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => { },
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getProductOptions();
          this.form.reset();
          this.submitted = false;
        },
      });
    } else {
      this.apiService.createProductOption(this.form.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => { },
        complete: () => {
          document.getElementById('close-add')!.click();
          this.getProductOptions();
          this.form.reset();
          this.submitted = false;
        },
      });
    }
  }

  public remove(id: number): void {
    if (!confirm('Delete?')) return;
    this.apiService.removeProductOption(id).subscribe({
      next: (res) => {
      },
      error: () => { },
      complete: () => {
        this.getProductOptions();
      },
    });
  }

  public resetForm(): void {
    this.form.reset();
    this.getSelectedProductOption = null;
  }
}
