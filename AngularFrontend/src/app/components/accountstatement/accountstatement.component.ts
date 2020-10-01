import { isEmptyExpression } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from"@angular/forms";
import {Router} from"@angular/router";
import { TransactionService } from 'src/app/services/transaction.service'
import { isEmptyObject } from 'jquery';
import { Transaction } from 'src/app/model/Transaction';

@Component({
  selector: 'app-accountstatement',
  templateUrl: './accountstatement.component.html',
  styleUrls: ['./accountstatement.component.css']
})
export class AccountstatementComponent implements OnInit {

  accountstatementform:FormGroup;
  inboundClick = false;
  trans: Transaction[];
  accountNumber: Number;

  constructor(private formBuilder: FormBuilder, private router: Router, private transactionService: TransactionService) {
    this.accountstatementform = this.formBuilder.group({
      startdate: new FormControl('', Validators.required),
      enddate: new FormControl('', Validators.required)
      
    });
   }


  onSubmit(form)
  {
    // this.submitted=true;
    const accountNumber = parseInt(localStorage.getItem('Accno'));

    const date = {
      "startDate": form.value.startdate,
      "endDate": form.value.enddate
    }
    console.log(date)
    this.transactionService.getTransactions(date,accountNumber).subscribe(data => {
      console.log(data);
      this.trans = data;

    })
  }

 
  ngOnInit(): void {

 
  }




}
