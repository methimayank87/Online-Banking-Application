import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/model/User';

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
        "FatherName": data.aadharnumber,
        "DOB": data.dob,
        "OccupationType": data.occupationtype,
        "SourceOfIncome": data.sourceofincome,
        "AnnualIncome": data.annualincome,
        "DebitCardOpted":( data.debitCard) ? "yes" : "no",
        "NetBankingOpted": (data.netbanking) ? "yes" : "no"
    }
    return this._http.post<User>(this.baseUrl,JSON.stringify(user),this.httpOptions)
  }
}
