import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IUserModel } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean = false;
  private user: IUserModel = null;
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
      mail: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  public submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    this.apiService.login(this.form.value).subscribe({
      next: (user: IUserModel) => {
        this.user = user;


      },
      error: (err: any) => {
        if (err.status == 404) {
          this.notifier.notify("error", err.error.message)
        }
        console.log(err);

      },
      complete: () => {
        if (this.user.role != "Admin") {
          this.notifier.notify("error", "email or password is incorrect")
          return;
        }
        this.authService.login(this.user);
        this.notifier.notify("success", "Logged in")
        this.router.navigate([""]);
        this.submitted = false
      }
    });
  }

}
