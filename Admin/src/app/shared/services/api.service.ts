import { HttpClient } from '@angular/common/http';
import { ElementRef, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAbout } from '../models/about.model';
import { IBrand } from '../models/brand.model';
import { ICategory } from '../models/category.model';
import { IContact } from '../models/contact.model';
import { IDepartment } from '../models/department.model';
import { IOffer } from '../models/offer.model';
import { Pagination } from '../models/pagination';
import { IProductOption } from '../models/product-option.model';
import { IProductSlider } from '../models/product-slider.model';
import { IProduct } from '../models/product.model';
import { IResponseModel } from '../models/response.model';
import { ISettingSlider } from '../models/settings-slider.model';
import { ISetting } from '../models/settings.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }
  //#region Category
  public getCategories(
    page: number,
    pageSize: number
  ): Observable<IResponseModel<ICategory[]>> {
    return this.http.get<IResponseModel<ICategory[]>>(
      environment.apiUrl + `category?PageNumber=${page}&PageSize=${pageSize}`
    );
  }

  public login(data: any): Observable<any> {
    return this.http
      .post(environment.apiUrl + "Auth/Login", data)
  }




  public createCategory(data: any) {
    return this.http.post(environment.apiUrl + `category`, data);
  }
  public updateCategory(data: any) {
    return this.http.put(environment.apiUrl + `category`, data);
  }
  public removeCategory(id: any) {
    return this.http.delete(environment.apiUrl + `category/${id}`);
  }
  public removeCategoryUpload(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + `category/RemoveUpload`, data);
  }

  //#endregion

  //#region Department
  public getDepartments(): Observable<IResponseModel<IDepartment[]>> {
    return this.http.get<IResponseModel<IDepartment[]>>(
      environment.apiUrl + `department`
    );
  }
  public createDepartment(data: any) {
    return this.http.post(environment.apiUrl + `department`, data);
  }
  public updateDepartment(data: any) {
    return this.http.put(environment.apiUrl + `department`, data);
  }
  public removeDepartment(id: any) {
    return this.http.delete(environment.apiUrl + `department/${id}`);
  }
  //#endregion

  //#region Brand
  public getBrands(): Observable<IResponseModel<IBrand[]>> {
    return this.http.get<IResponseModel<IBrand[]>>(
      environment.apiUrl + `brand`
    );
  }
  public createBrand(data: any) {
    return this.http.post(environment.apiUrl + `brand`, data);
  }
  public updateBrand(data: any) {
    return this.http.put(environment.apiUrl + `brand`, data);
  }
  public removeBrand(id: any) {
    return this.http.delete(environment.apiUrl + `brand/${id}`);
  }
  public removeBrandUpload(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + `brand/RemoveUpload`, data);
  }

  //#endregion

  //#region About
  public getAbouts(): Observable<IResponseModel<IAbout[]>> {
    return this.http.get<IResponseModel<IAbout[]>>(
      environment.apiUrl + `About`
    );
  }
  public createAbout(data: any) {
    return this.http.post(environment.apiUrl + `About`, data);
  }
  public updateAbout(data: any) {
    return this.http.put(environment.apiUrl + `About`, data);
  }
  public removeAbout(id: any) {
    return this.http.delete(environment.apiUrl + `About/${id}`);
  }
  public removeAboutUpload(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + `about/RemoveUpload`, data);
  }
  //#endregion

  //#region Contact
  public getContacts(): Observable<IResponseModel<IContact[]>> {
    return this.http.get<IResponseModel<IContact[]>>(
      environment.apiUrl + `contact`
    );
  }
  public createContact(data: any) {
    return this.http.post(environment.apiUrl + `contact`, data);
  }
  public updateContact(data: any) {
    return this.http.put(environment.apiUrl + `contact`, data);
  }
  public removeContact(id: any) {
    return this.http.delete(environment.apiUrl + `contact/${id}`);
  }
  //#endregion

  //#region Offer
  public getOffers(): Observable<IResponseModel<IOffer[]>> {
    return this.http.get<IResponseModel<IOffer[]>>(
      environment.apiUrl + `offer`
    );
  }
  public createOffer(data: any) {
    return this.http.post(environment.apiUrl + `offer`, data);
  }
  public updateOffer(data: any) {
    return this.http.put(environment.apiUrl + `offer`, data);
  }
  public removeOffer(id: any) {
    return this.http.delete(environment.apiUrl + `offer/${id}`);
  }
  //#endregion

  //#region Settings
  public getSettings(): Observable<IResponseModel<ISetting[]>> {
    return this.http.get<IResponseModel<ISetting[]>>(
      environment.apiUrl + `setting`
    );
  }
  public createSetting(data: any) {
    return this.http.post(environment.apiUrl + `setting`, data);
  }
  public updateSetting(data: any) {
    return this.http.put(environment.apiUrl + `setting`, data);
  }
  public removeSetting(id: any) {
    return this.http.delete(environment.apiUrl + `setting/${id}`);
  }

  //#endregion

  //#region SettingSlider
  public getSliders(): Observable<IResponseModel<ISettingSlider[]>> {
    return this.http.get<IResponseModel<ISettingSlider[]>>(
      environment.apiUrl + `setting/slider`
    );
  }
  public createSlider(data: any) {
    return this.http.post(environment.apiUrl + `setting/slider`, data);
  }
  public updateSlider(data: any) {
    return this.http.put(environment.apiUrl + `setting/slider`, data);
  }
  public removeSlider(id: any) {
    return this.http.delete(environment.apiUrl + `setting/slider/${id}`);
  }
  public removeSliderUpload(data: any): Observable<any> {
    return this.http.post(environment.apiUrl + `setting/slider/RemoveUpload`, data);
  }
  //#endregion

  //#region Product
  public getProducts(pagination: Pagination): Observable<IResponseModel<IProduct[]>> {
    return this.http.get<IResponseModel<IProduct[]>>(environment.apiUrl + `product?pageNumber=${pagination.firstPage}&pageSize=${pagination.pageSize}`);
  }
  public getProductById(id: number): Observable<IResponseModel<IProduct>> {
    return this.http.get<IResponseModel<IProduct>>(environment.apiUrl + `product/${id}`);
  }
  // public getProductById(id): Observable<IProduct> {
  //   return this.http.get<IProduct>(environment.apiUrl + `product/admin/${id}`)
  // }
  public createProduct(data: any) {
    return this.http.post(environment.apiUrl + `product`, data)
  }
  public updateProduct(data: any) {
    return this.http.put(environment.apiUrl + `product`, data)
  }
  public removeProduct(id: any) {
    return this.http.delete(environment.apiUrl + `product/${id}`)
  }
  public removeProductPhoto(id: any) {
    return this.http.delete(environment.apiUrl + `product/RemovePhoto/${id}`)
  }

  public uploadImg(data: any) {
    return this.http.post(environment.apiUrl + 'FileUpload', data)
  }

  public removeUpload(path: string, id?: number) {
    let data = { filePath: path }
    return this.http.post(environment.apiUrl + 'FileUpload/RemoveUpload', data)
  }

  //#endregion

  //#region  Option
  public getProductOptions(): Observable<IResponseModel<IProductOption[]>> {
    return this.http.get<IResponseModel<IProductOption[]>>(
      environment.apiUrl + `productOption`
    );
  }
  public createProductOption(data: any) {
    return this.http.post(environment.apiUrl + `productOption`, data);
  }
  public updateProductOption(data: any) {
    return this.http.put(environment.apiUrl + `productOption`, data);
  }
  public removeProductOption(id: any) {
    return this.http.delete(environment.apiUrl + `productOption/${id}`);
  }
  //#endregion

  //#region  ProductSlider
  public getProductSliders(): Observable<IResponseModel<IProductSlider[]>> {
    return this.http.get<IResponseModel<IProductSlider[]>>(
      environment.apiUrl + `productSlider`
    );
  }
  public createProductSlider(data: any) {
    return this.http.post(environment.apiUrl + `productSlider`, data);
  }
  public updateProductSlider(data: any) {
    return this.http.put(environment.apiUrl + `productSlider`, data);
  }
  public removeProductSlider(id: any) {
    return this.http.delete(environment.apiUrl + `productSlider/${id}`);
  }
  //#endregion

  //#region Sale
  public getSales(): Observable<IResponseModel<any[]>> {
    return this.http.get<IResponseModel<any[]>>(
      environment.apiUrl + `sale`
    );
  }
  public getSaleItems(saleId: number): Observable<IResponseModel<any[]>> {
    return this.http.get<IResponseModel<any[]>>(
      environment.apiUrl + `sale/saleItems/${saleId}`
    );
  }
  //#endregion

  public getData(endpoint: string, page?: number, takeSize?: number): Observable<any> {
    let checkQuery = endpoint.includes("?");
    if (page && takeSize) return this.http.get(environment.apiUrl + endpoint + `${checkQuery ? "&" : "?"}pageNumber=${page}&pageSize=${takeSize}`);
    else return this.http.get(environment.apiUrl + endpoint);
  }



}
