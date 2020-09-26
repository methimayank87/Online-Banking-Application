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
  registerAddress(data, id){
    const raddress = {
      "UserId": id,
      "AddressLine1": data.addrline1,
      "AddressLine2": data.addrline2,
      "Landmark": data.landmark,
      "State1": data.state,
      "City": data.city,
      "Pincode": data.pincode
    }
    return this._http.post<Raddress>(this.baseUrl,JSON.stringify(raddress),this.httpOptions)
  }
}
