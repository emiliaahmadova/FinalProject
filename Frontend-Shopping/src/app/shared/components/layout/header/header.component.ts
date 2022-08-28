import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { FilterOptions } from 'src/app/shared/models/filter-options';
import { IProduct } from 'src/app/shared/models/product.model';
import { IUserModel } from 'src/app/shared/models/user.model';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public searchKey: string = '';
  public products: IProduct[] = [];
  public user: IUserModel = null;
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private notifier: NotifierService
  ) {
    this.user = JSON.parse(localStorage.getItem("user")) as IUserModel;
  }

  ngOnInit(): void { }

  public search(value?: string): void {
    if (value != "" && value) {
      this.searchKey = value;
      this.apiService
        .getFilteredProduct(new FilterOptions(this.searchKey))
        .subscribe((res) => {
          this.products = res.data;
        });
    } else {
      this.products = []
    }


  }

  public navigate($event: Event, id: number): void {
    $event.preventDefault();
    this.router.navigate(['/product', id]);
    this.products = [];
    document.getElementById('search')['value'] = null;
  }

  onLogout() {
    this.authService.logout();
    this.user = null;
    this.notifier.notify("error", "Logged out")
  }
}
