import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IUserModel } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean = false;
  constructor(private fb: FormBuilder, private apiService: ApiService, private authService:
    AuthService, private router: Router, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.generateForm();
  }

  get f() {
    return this.form.controls;
  }


  private generateForm(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  public submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    this.apiService.forgetPassword(this.form.value).subscribe({
      next: (res) => {
      },
      error: (err: any) => {
        if (err.status == 404) {
          this.notifier.notify("error", err.error.message)
        }
      },
      complete: () => {
        this.notifier.notify("success", "Mail sended")
        this.router.navigate(["/auth/login"]);
        this.submitted = false
      }
    });
  }

}
