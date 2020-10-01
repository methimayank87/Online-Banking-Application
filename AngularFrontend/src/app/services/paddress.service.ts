import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paddress } from 'src/app/model/Paddress';
@Injectable({
  providedIn: 'root'
})
export class PaddressService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  baseUrl:string = "https://localhost:44306/api/paddresses";
  constructor(private _http : HttpClient) { }
  registerAddress(data: Paddress){
    return this._http.post<Paddress>(this.baseUrl,data,this.httpOptions)
  }
  getAddress(userid){
    return this._http.get<Paddress>(this.baseUrl + '/' + userid,this.httpOptions)
  }
}
