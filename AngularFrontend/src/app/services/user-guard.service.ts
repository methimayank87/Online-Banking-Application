import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService {

  constructor() { }
  gettoken(){  
    return !!sessionStorage.getItem("userData");
  }
}
