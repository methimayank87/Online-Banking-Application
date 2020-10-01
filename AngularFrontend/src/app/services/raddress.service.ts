import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Raddress } from 'src/app/model/Raddress';
@Injectable({
  providedIn: 'root'
})
export class RaddressService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  baseUrl:string = "https://localhost:44306/api/raddresses";
  constructor(private _http : HttpClient) { }
  registerAddress(data : Raddress){
   
    console.log(data)
    return this._http.post<Raddress>(this.baseUrl,data,this.httpOptions)
  }
  getAddress(userid){
    return this._http.get<Raddress>(this.baseUrl + '/' + userid,this.httpOptions)
  }
}
