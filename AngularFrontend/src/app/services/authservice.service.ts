import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {TokenParams} from 'src/app/model/TokenParams';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  AccessToken:string="";

  constructor(private http:HttpClient) { }
  private TokenAPI='https://localhost:44306/token';
  login(Username:string, Password:string):Observable<TokenParams>
  {
    var headersforTokenAPI=new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    var data="grant-type=password&username" + Username + "&password=" + Password;
    return this.http.post(this.TokenAPI,data, {headers :headersforTokenAPI})
    .map(res =>res.json());
  }
}
