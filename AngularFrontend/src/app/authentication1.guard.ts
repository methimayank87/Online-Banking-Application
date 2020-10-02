import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserGuardService } from 'src/app/services/user-guard.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class Authentication1Guard implements CanActivate {
  constructor(private UserGuardService: UserGuardService, private router: Router) {}
  canActivate():boolean
  {
    if (!this.UserGuardService.gettoken()) {  
      this.router.navigateByUrl("/userlogin");  
  }  
  return this.UserGuardService.gettoken(); 
  }
  
}
