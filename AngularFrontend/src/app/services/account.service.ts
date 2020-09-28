import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Account } from 'src/app/model/Account';

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
  updateAccount(account : Account,data){
    const newAccount = {
      "AccountNumber": account.AccountNumber,
      "UserID": account.UserID,
      "Balance": account.Balance,
      "LoginPassword": data.loginpwd,
      "TransactionPassword": account.TransactionPassword
    }
    return this._http.put(this.baseUrl + '/' + account.UserID,JSON.stringify(newAccount),this.httpOptions);
  }
}
