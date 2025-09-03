import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private readonly userService: UserService,
              private readonly router: Router ) { }

  canActivate(): | Observable<boolean | UrlTree>
                 | Promise<boolean | UrlTree>
                 | boolean
                 | UrlTree   {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/home']);
      return false;
    }
    this.userService.isLoggedIn();
    return true;
  }
}
