import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/model/User';
import { AccountstatementComponent } from '../components/accountstatement/accountstatement.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  baseUrl:string = "https://localhost:44306/api/users";

  constructor(private _http : HttpClient) { }

  registerUser(data){
    const user = {
      "FirstName": data.firstname,
        "MiddleName": data.middlename,
        "LastName": data.lastname,
        "Gender": data.gender,
        "Email": data.email,
        "Phone": data.mobilenumber,
        "FatherName": data.fathername,
        "DOB": data.dob,
        "OccupationType": data.occupationtype,
        "SourceOfIncome": data.sourceofincome,
        "AnnualIncome": data.annualincome,
        "DebitCardOpted":( data.debitCard) ? "yes" : "no",
        "NetBankingOpted": (data.netbanking) ? "yes" : "no"
    }
    console.log(user)
    return this._http.post<User>(this.baseUrl,JSON.stringify(user),this.httpOptions)
  }

  forgotUserId(account){
    return this._http.post<Number>(this.baseUrl + '/forgotid/' + account,JSON.stringify(account),this.httpOptions)
  }
}
