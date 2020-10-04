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

  getAllRequests(){
    return this._http.get<AdminApproval[]>(this.baseUrl)
  }

  getRequestById(requestId: number){
    return this._http.get<AdminApproval>(this.baseUrl+'/'+requestId);
  }
  updateRequestStatus(request: AdminApproval){
    const adminApproval = {
      "ApprovalID":request.ApprovalID,
      "AdminID": request.AdminID,
      "UserID": request.UserID,
      "ApprovalStatus": 'approved',
      "ApprovalDate": new Date(),
    }
    return this._http.put(this.baseUrl+'/'+ request.ApprovalID ,adminApproval,this.httpOptions)
  }
  rejectRequestStatus(request: AdminApproval){
    const adminApproval = {
      "ApprovalID":request.ApprovalID,
      "AdminID": request.AdminID,
      "UserID": request.UserID,
      "ApprovalStatus": 'cancelled',
      "ApprovalDate": new Date(),
    }
    return this._http.put(this.baseUrl+'/'+ request.ApprovalID ,adminApproval,this.httpOptions)
  }
}
