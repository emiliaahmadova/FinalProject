import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { IResponseModel } from '../models/response.model';
import { IProduct } from '../models/product.model';
import { ISettingSlider } from '../models/settings-slider.model';
import { IOffer } from '../models/offer.model';
import { ISetting } from '../models/settings.model';
import { IContact } from '../models/contact.model';
import { IAbout } from '../models/about.model';
import { ICategory } from '../models/category.model';
import { IDepartment } from '../models/department.model';
import { IBrand } from '../models/brand.model';
import { IUserModel } from '../models/user.model';
import { FilterOptions } from '../models/filter-options';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }

  //#region Auth
  public login(data: any): Observable<any> {
    return this.http
      .post(environment.apiUrl + "Auth/Login", data)
  }
  public register(data: any): Observable<IUserModel> {
    return this.http.post<IUserModel>(environment.apiUrl + `auth/register`, data);
  }

  public forgetPassword(data: any): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + `auth/ForgetPassword`,
      data
    );
  }

  public recoveryPassword(data: any): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl + `auth/recoveryPassword`,
      data
    );
  }

  public checkToken(token: string): Observable<any> {
    return this.http.get<any>(environment.apiUrl + `auth/CheckToken`, {
      params: {
        token,
      },
    });
  }
  //#endregion

  public getCategories(): Observable<IResponseModel<ICategory[]>> {
    return this.http.get<IResponseModel<ICategory[]>>(
      environment.apiUrl + `category`
    );
  }

  public getDepartments(): Observable<IResponseModel<IDepartment[]>> {
    return this.http.get<IResponseModel<IDepartment[]>>(
      environment.apiUrl + `department`
    );
  }
  public getDepartmentById(id: number): Observable<IResponseModel<IDepartment>> {
    return this.http.get<IResponseModel<IDepartment>>(
      environment.apiUrl + `department/${id}`
    );
  }
  public getCategoryById(id: number): Observable<IResponseModel<ICategory>> {
    return this.http.get<IResponseModel<ICategory>>(
      environment.apiUrl + `category/${id}`
    );
  }
  public getBrands(): Observable<IResponseModel<IBrand[]>> {
    return this.http.get<IResponseModel<IBrand[]>>(
      environment.apiUrl + `Brand?PageNumber=1&PageSize=6`
    );
  }
  public getAbouts(): Observable<IResponseModel<IAbout[]>> {
    return this.http.get<IResponseModel<IAbout[]>>(
      environment.apiUrl + `About`
    );
  }

  public getContacts(): Observable<IResponseModel<IContact[]>> {
    return this.http.get<IResponseModel<IContact[]>>(
      environment.apiUrl + `contact`
    );
  }


  public getSetting(): Observable<IResponseModel<ISetting[]>> {
    return this.http.get<IResponseModel<ISetting[]>>(
      environment.apiUrl + `setting/GetOrderFirstSetting`
    );
  }
  public getSliders(): Observable<IResponseModel<ISettingSlider[]>> {
    return this.http.get<IResponseModel<ISettingSlider[]>>(
      environment.apiUrl + `setting/slider`
    );
  }

  //#region Product

  public getProductsByDepartmentId(departmentId: number): Observable<IResponseModel<IProduct[]>> {
    return this.http.get<IResponseModel<IProduct[]>>(
      environment.apiUrl + `product/GetProductsByDepartment?departmentId=${departmentId}}`
    );
  }

  public getProductsByCategoryId(categoryId: number): Observable<IResponseModel<IProduct[]>> {
    return this.http.get<IResponseModel<IProduct[]>>(
      environment.apiUrl + `product/GetProductsByCategory?categoryId=${categoryId}}`
    );
  }

  public getProductById(id: number): Observable<IResponseModel<IProduct>> {
    return this.http.get<IResponseModel<IProduct>>(
      environment.apiUrl + `product/GetByIdForClient/${id}`
    );
  }


  public getFilteredProduct(filterOptions?: FilterOptions, pageSize?: number, page?: number): Observable<IResponseModel<IProduct[]>> {
    if (filterOptions) {
      if (filterOptions.name != null) {
        return this.http.get<IResponseModel<IProduct[]>>(
          environment.apiUrl + `product/GetFilteredProducts`, {
          params: {
            name: filterOptions.name,
            minPrice: filterOptions.minPrice,
            maxPrice: filterOptions.maxPrice,
            brandId: filterOptions.brandId,
            categoryId: filterOptions.categoryId,
            departmentId: filterOptions.departmentId,
          }
        }
        );
      } else {
        return this.http.get<IResponseModel<IProduct[]>>(
          environment.apiUrl + `product/GetFilteredProducts`, {
          params: {
            minPrice: filterOptions.minPrice,
            maxPrice: filterOptions.maxPrice,
            brandId: filterOptions.brandId,
            categoryId: filterOptions.categoryId,
            departmentId: filterOptions.departmentId,
          }
        }
        );
      }

    } else {
      return this.http.get<IResponseModel<IProduct[]>>(environment.apiUrl + `product/GetFilteredProducts`);
    }

  }


  //#endregion

  //#region Sale
  public sale(data: any): Observable<IResponseModel<any>> {
    return this.http.post<IResponseModel<any>>(
      environment.apiUrl + `sale`, data
    );
  }
  //#endregion

  //#region About
  public getAbout(): Observable<IResponseModel<any>> {
    return this.http.get<IResponseModel<any>>(
      environment.apiUrl + `about/GetActiveAbout`
    );
  }
  //#endregion
  //#region Offer
  public getOffers(): Observable<IResponseModel<any>> {
    return this.http.get<IResponseModel<any>>(
      environment.apiUrl + `offer/GetActives`
    );
  }
  //#endregion
}
