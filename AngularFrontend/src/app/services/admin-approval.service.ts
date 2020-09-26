import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminApproval } from 'src/app/model/AdminApproval';
@Injectable({
  providedIn: 'root'
})
export class AdminApprovalService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  baseUrl:string = "https://localhost:44306/api/adminapprovals";
  constructor(private _http : HttpClient) { }
  sendRequest(id){
    const adminApproval = {
      "AdminID": 2345,
      "UserID": id,
      "ApprovalStatus": 'pending',
      "ApprovalDate": new Date(),
    }
    return this._http.post<AdminApproval>(this.baseUrl,JSON.stringify(adminApproval),this.httpOptions)
  }
}
