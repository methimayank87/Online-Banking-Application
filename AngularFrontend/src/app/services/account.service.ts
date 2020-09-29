import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from 'src/app/model/Account';
import { Beneficiary } from 'src/app/model/Beneficiary';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  baseUrl:string = "https://localhost:44306/api/accounts";
  constructor(private _http : HttpClient) { }
  createAccount(userId){
    const account = {
      "UserID": userId,
      "Balance": 0,
      "LoginPassword": Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
      "TransactionPassword": Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    }
    console.log(account)
    return this._http.post<Account>(this.baseUrl,JSON.stringify(account),this.httpOptions)
  }
  getAccountById(id : number){
    return this._http.get<Account>(this.baseUrl + '/getbyid/' + id,this.httpOptions);
  }
  getAccountByNumber(accno: number){
    return this._http.get<Account>(this.baseUrl + '/' + accno, this.httpOptions)
  }
  updateAccount(account : Account){
    return this._http.put(this.baseUrl + '/' + account.UserID,JSON.stringify(account),this.httpOptions);
  }

  addBeneficiary(data){
    const accno = localStorage.getItem('Accno')
    return this._http.post<Beneficiary>(this.baseUrl + '/' + accno + '/beneficiaries',JSON.stringify(data),this.httpOptions);
  }
}
