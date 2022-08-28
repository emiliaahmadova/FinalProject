import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { IUserModel } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss']
})
export class RecoveryPasswordComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean = false;
  private user: IUserModel = null;
  private token: string = "";
  constructor(private fb: FormBuilder, private apiService: ApiService, private authService:
    AuthService, private router: Router, private notifier: NotifierService, private route: ActivatedRoute,) {
    this.token = this.route.snapshot.queryParams["tkn"];
    this.checkToken();

  }

  ngOnInit(): void {
    this.generateForm();
  }

  get f() {
    return this.form.controls;
  }


  private generateForm(): void {
    this.form = this.fb.group({
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required]],
      forgetPasswordToken: [this.token]

    });
  }

  public submit(): void {
    this.submitted = true;
    if (this.form.get("password").value != this.form.get("confirmPassword").value) {
      this.form.get("confirmPassword").setErrors({ notsame: true });
      return;
    }

    if (this.form.invalid) return;


    this.apiService.recoveryPassword(this.form.value).subscribe({
      next: (res: any) => { },
      error: (err: any) => {
        this.notifier.notify("error", "Error");
      },
      complete: () => {
        this.notifier.notify("success", "Pasword sucessfuly resetted");
        this.router.navigate(["/auth"]);
      }
    });

  }

  private checkToken() {
    if (this.token == undefined) {
      this.router.navigate(["/"]);
      return;
    }

    this.apiService.checkToken(this.token).subscribe({
      next: res => {
        if (res["data"] == null) {
          this.notifier.notify("error", "User not founded");
          this.router.navigate(["/auth"]);
        }
      },
      error: () => {
        this.router.navigate(["/auth"]);
      },
      complete: () => { }
    });
  }
}
