import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {TokenParams} from 'src/app/model/TokenParams';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  AccessToken:string="";

  constructor(private _http:HttpClient) { }
  private TokenAPI='https://localhost:44306/token';
  login(Username:string, Password:string):Observable<TokenParams>
  {
    var headersforTokenAPI=new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
    var data="grant-type=password&username" + Username + "&password=" + Password;
    return this._http.post(this.TokenAPI,data, {headers :headersforTokenAPI}).pipe(map((res:any)=>res.json()));
  }
}
