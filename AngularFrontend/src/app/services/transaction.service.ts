import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from 'src/app/model/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  baseUrl:string = "https://localhost:44306/api/transactions";

  constructor(private _http : HttpClient) { }

  addTransaction(data){
    return this._http.post<Number>(this.baseUrl,JSON.stringify(data),this.httpOptions);
  }

  getOtp(accountNumber){
    return this._http.post<Number>(this.baseUrl + '/sendotp',accountNumber,this.httpOptions)
  }

  getTransactions(data,accountNumber){
    return this._http.post<Transaction[]>(this.baseUrl + '/accounts/' + accountNumber + '/getbydate',data,this.httpOptions)
  }
}
