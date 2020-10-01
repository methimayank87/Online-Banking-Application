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
  registerAddress(data, id){
    console.log(id)
    console.log(data.peraddrline1)
    const paddress = {
      "UserId": id,
      "AddressLine1": data.peraddrline1,
      "AddressLine2": data.peraddrline2,
      "Landmark": data.perlandmark,
      "State1": data.perstate,
      "City": data.percity,
      "Pincode": data.perpincode
    }
    return this._http.post<Paddress>(this.baseUrl,JSON.stringify(paddress),this.httpOptions)
  }
}
