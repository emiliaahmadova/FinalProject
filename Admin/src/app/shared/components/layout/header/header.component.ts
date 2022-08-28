import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  public logout($event): void {
    $event.preventDefault();
    this.authService.logout();
    this.router.navigate(["auth"])
  }

  ngOnInit(): void {
  }

}
