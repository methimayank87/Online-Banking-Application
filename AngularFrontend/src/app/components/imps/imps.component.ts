import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Beneficiary } from 'src/app/model/Beneficiary';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-imps',
  templateUrl: './imps.component.html',
  styleUrls: ['./imps.component.css']
})
export class ImpsComponent implements OnInit {

  impsForm:FormGroup;
  listBeneficiaries: Beneficiary[];
  beneficiary: Beneficiary;
  constructor(private router:Router,private formBuilder: FormBuilder, private accountService: AccountService,  private transactionService: TransactionService) {

    this.impsForm = this.formBuilder.group({
      fromaccount: new FormControl('',Validators.required),
      toaccount: new FormControl('',Validators.required),
      amount: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      remark: new FormControl('')
    });
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
    const sender = localStorage.getItem('Accno');
    const transaction = {
      "TransactionMode": "IMPS",
      "SenderAccount": sender,
      "ReceiverAccount": this.beneficiary.BenAccountNumber,
      "Amount": form.value.amount,
      "TransactionDate": new Date(),
      "Remarks": form.value.remark
    }
    this.transactionService.addTransaction(transaction).subscribe(data => {
      if(data === 200){
        alert("Transaction successful")
      }else{
        alert("Transaction failed")
      }
      
    })
  }
  get f(){
    return this.impsForm.controls;
  }


}
