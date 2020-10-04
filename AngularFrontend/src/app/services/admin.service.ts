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
    return this._http.post(this.baseUrl + '/bulkmail',data);
  }

  sendBulkSms(data){
    return this._http.post(this.baseUrl + '/bulksms',data);
  }
  getUsersByDate(data){
    return this._http.post<number>(this.baseUrl + '/countusersbydate',data,this.httpOptions)
  }
  getTransByDate(data){
    return this._http.post<number>(this.baseUrl + '/counttransbydate',data,this.httpOptions)
  }
  getImpsByDate(data){
    return this._http.post<number>(this.baseUrl + '/countamountbydateimps',data,this.httpOptions)
  }
  getRtgsByDate(data){
    return this._http.post<number>(this.baseUrl + '/countamountbydatertgs',data,this.httpOptions)
  }
  getNeftByDate(data){
    return this._http.post<number>(this.baseUrl + '/countamountbydateneft',data,this.httpOptions)
  }
}
