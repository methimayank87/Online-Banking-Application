import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Beneficiary } from 'src/app/model/Beneficiary';
import { Transaction } from 'src/app/model/Transaction';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-rtgs',
  templateUrl: './rtgs.component.html',
  styleUrls: ['./rtgs.component.css']
})
export class RtgsComponent implements OnInit {
  rtgsForm:FormGroup;
  otpForm: FormGroup;
  listBeneficiaries: Beneficiary[];
  beneficiary: Beneficiary;
  showOtp: boolean = false;
  transaction: Transaction;
  currentOtp: Number;
  correctOtp : boolean = false;
  STran: Transaction;
  tranId: Number;
  constructor(private router:Router,private formBuilder: FormBuilder, private accountService: AccountService,private transactionService: TransactionService) { 
    this.rtgsForm = this.formBuilder.group({
      toaccount: new FormControl('',Validators.required),
      amount: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      date: new FormControl('', Validators.required),
      remark: new FormControl(''),
      transactionpwd: new FormControl('',Validators.required)
    });
    this.otpForm = this.formBuilder.group({
      otp: new FormControl('', [Validators.required, Validators.min(1000), Validators.max(9999), Validators.pattern("^[0-9]*$")])
    })
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
    const sender = parseInt(localStorage.getItem('Accno'));
    console.log(this.beneficiary);
    this.transaction = {
      "TransactionMode": "RTGS",
      "SenderAccount": sender,
      "ReceiverAccount": this.beneficiary.BenAccountNumber,
      "Amount": form.value.amount,
      "TransactionDate": new Date(),
      "Remarks": form.value.remark
    }
    const accountNumber= parseInt(localStorage.getItem('Accno'))
    this.accountService.getAccountByNumber(accountNumber).subscribe(data => {
      if(data.TransactionPassword=== form.value.transactionpwd){
        this.showOtp = true;
        this.transactionService.getOtp(accountNumber).subscribe(data => {
          console.log(data);
          this.currentOtp = data
      })
       }else{
        alert("Transaction failed. Wrong Transaction Password.")
      }
    })
  }
  get f(){
    return this.rtgsForm.controls;
  }
  get f2(){
    return this.otpForm.controls;
  }
  onSubmit2(form){
    try{
      if(this.currentOtp === form.value.otp){
          this.transactionService.addTransaction(this.transaction).subscribe(data => {
          if(data === 500){
            alert("Transaction failed")
          }else{
            console.log(data)
            this.tranId = data;
            localStorage.setItem('tranId', data.toString())
            this.router.navigate(['transactionSuccess', this.tranId])
          }
        })
      }      
    }
    catch{
      alert("Incorrect OTP");
    }  
  }
  


}
