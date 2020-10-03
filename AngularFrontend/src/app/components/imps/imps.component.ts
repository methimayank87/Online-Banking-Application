import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Beneficiary } from 'src/app/model/Beneficiary';
import { Transaction } from 'src/app/model/Transaction';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-imps',
  templateUrl: './imps.component.html',
  styleUrls: ['./imps.component.css']
})
export class ImpsComponent implements OnInit {

  impsForm:FormGroup;
  otpForm: FormGroup;
  listBeneficiaries: Beneficiary[];
  beneficiary: Beneficiary;
  transaction: Transaction; 
  showOtp: boolean = false;
  currentOtp: Number;
  correctOtp : boolean = false;
  STran: Transaction;
  tranId: Number;
  constructor(private router:Router,private formBuilder: FormBuilder, private accountService: AccountService,  private transactionService: TransactionService) {

    this.impsForm = this.formBuilder.group({
      toaccount: new FormControl('',Validators.required),
      amount: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
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
    this.accountService.getAllBeneficiaries().subscribe(data => {
      console.log(data)
      this.listBeneficiaries = data});
  }

  setBen(ben: Beneficiary){
    console.log(ben)
    this.beneficiary = ben;
  }

  onSubmit(form){
    const sender = parseInt(localStorage.getItem('Accno'));
    console.log(this.beneficiary);
    this.transaction = {
      "TransactionMode": "IMPS",
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
    return this.impsForm.controls;
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
            this.transactionService.getTransactionById(this.tranId).subscribe(data => {
              this.STran = {
                "TransactionMode": "IMPS",
                "SenderAccount": data.SenderAccount,
                "ReceiverAccount": data.ReceiverAccount,
                "Amount": data.Amount,
                "TransactionDate": data.TransactionDate,
                "Remarks": data.Remarks
              }
            })
            this.correctOtp = true;
            //this.router.navigate(['fundstransfer'])
          }
          
        })
        
      }
    }catch{
      alert("Incorrect OTP");
    }
  }

  navigate(){
    this.router.navigate(['fundstransfer'])
  }

}
