import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Beneficiary } from 'src/app/model/Beneficiary';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private _http : HttpClient) { }
  
}
