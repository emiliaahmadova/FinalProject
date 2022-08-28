import { IUserModel } from 'src/app/shared/models/user.model';
import { NotifierService } from 'angular-notifier';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "src/app/shared/services/api.service";
import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
      phone: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  public submit(): void {
    this.submitted = true;
    if (this.form.invalid) return;

    this.apiService.register(this.form.value).subscribe({
      next: (user: IUserModel) => {
        this.user = user;
      },
      error: (err: any) => {
        // if (err.status == 404) {
        //   this.notifier.notify("error", err.error.message)
        // }
        // console.log(err);
      },
      complete: () => {
        this.authService.login(this.user);
        this.notifier.notify("success", "You have registered successfully")
        this.router.navigate([""]);
        this.submitted = false
      }
    });
  }

}
