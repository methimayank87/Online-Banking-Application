import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Admin } from 'src/app/model/Admin';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  baseUrl:string = "https://localhost:44306/api/admins";
  constructor(private _http : HttpClient) { }

  sendBulkMail(data){
    return this._http.post(this.baseUrl + '/bulkmail',data.mailbody,this.httpOptions);
  }

  sendBulkSms(data){
    return this._http.post(this.baseUrl + '/bulksms',data.smsbody,this.httpOptions);
  }
}
