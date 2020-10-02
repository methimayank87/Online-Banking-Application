import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Admin} from 'src/app/model/Admin';
@Injectable({
  providedIn: 'root'
})
export class AdminloginService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  baseUrl:string = "https://localhost:44306/api/adminlogin";
  constructor(private _http : HttpClient) { }
  doLogin(data) {
    console.log(data);
    
    return this._http.post<Admin>(this.baseUrl, data,this.httpOptions);
  }
  isLoggedIn(){
    if(sessionStorage.getItem('adminData')){
      return true;
    }
    return false;
  }
  Logout()
  {
    if(sessionStorage.getItem('adminData'))
    {
      sessionStorage.removeItem('adminData');
    }
  }
}