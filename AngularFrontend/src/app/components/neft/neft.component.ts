import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Beneficiary } from 'src/app/model/Beneficiary';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-neft',
  templateUrl: './neft.component.html',
  styleUrls: ['./neft.component.css']
})
export class NeftComponent implements OnInit {
  neftForm:FormGroup;
  listBeneficiaries: Beneficiary[];
  beneficiary: Beneficiary;
  constructor(private router:Router,private formBuilder: FormBuilder, private accountService: AccountService,private transactionService: TransactionService) { 
    this.neftForm = this.formBuilder.group({
      toaccount: new FormControl('',Validators.required),
      amount: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      date: new FormControl('', Validators.required),
      remark: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getBeneficiaries()
  }

  getBeneficiaries(){
    this.accountService.getAllBeneficiaries().subscribe(data => this.listBeneficiaries = data);
  }

  setBen(ben: Beneficiary){
    console.log(ben)
    this.beneficiary = ben;
  }

  onSubmit(form){
    const sender = localStorage.getItem('Accno');
    const transaction = {
      "TransactionMode": "NEFT",
      "SenderAccount": sender,
      "ReceiverAccount": this.beneficiary.BenAccountNumber,
      "Amount": form.value.amount,
      "TransactionDate": form.value.date,
      "Remarks": form.value.remark
    }
    this.transactionService.addTransaction(transaction).subscribe(data => {
      console.log(data)
      alert("Transaction successful")
    })
  }
  get f(){
    return this.neftForm.controls;
  }

}
