import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<IUserModel>;
  public currentUser: Observable<IUserModel>;
  public currentUserInfo: BehaviorSubject<IUserModel> = new BehaviorSubject<IUserModel>(null);
  public isUserLoggedin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isFederationDataUpdated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {
    let userTkn: string = null;
    if (localStorage.getItem('admin') != null) {
      userTkn = localStorage.getItem('admin') as string;
      this.isUserLoggedin$.next(true);
    }
    this.currentUserSubject = new BehaviorSubject<any>(userTkn);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get CurrentUserValue(): any {
    return this.currentUserSubject?.value;
  }

  public login(user: IUserModel): void {
    localStorage.setItem('admin', JSON.stringify(user));
    this.currentUserSubject.next(user);
    this.isUserLoggedin$.next(true);
  }
  public logout(): void {
    localStorage.removeItem('admin');
    this.currentUserSubject.next(null);
    this.isUserLoggedin$.next(false);
  }

}
