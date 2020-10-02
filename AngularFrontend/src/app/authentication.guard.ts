import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthguardService} from 'src/app/services/auth-guard.service';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(private Authguardservice: AuthguardService, private router: Router) {}
  canActivate():boolean
  {
    if (!this.Authguardservice.gettoken()) {  
      this.router.navigateByUrl("/adminlogin");  
  }  
  return this.Authguardservice.gettoken(); 
  }
}