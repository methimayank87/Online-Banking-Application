import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/model/Account';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-netbanking',
  templateUrl: './netbanking.component.html',
  styleUrls: ['./netbanking.component.css']
})
export class NetbankingComponent implements OnInit {

  netbankingForm: FormGroup;
  otpForm: FormGroup;
  passwordForm: FormGroup;
  requestSent: boolean = false;
  showPassword: boolean = false;
  currentAccount: Account;
  currentUser: User;
  currentOtp: Number;
  constructor(public formBuilder: FormBuilder, private router: Router, private userService: UserService, private accountService: AccountService) {
      this.netbankingForm=this.formBuilder.group({
        accountnumber: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern("^[0-9]*$")]),
      });
      this.otpForm = this.formBuilder.group({
        otp: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$")]),
      })
      this.passwordForm= this.formBuilder.group({
        loginpwd: new FormControl('', [Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{8,}')]),      
        transactionpwd: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{8,}')]),
        confirmtransactionpwd: new FormControl('', [Validators.required]),
        confirmloginpwd: new FormControl('',Validators.required)}, { 
          validators: this.confirmedValidator('loginpwd', 'confirmloginpwd') 
      })

  }

  ngOnInit() {
   
  }

  get f(){
    return this.netbankingForm.controls;
  }
  get f2(){
    return this.otpForm.controls;
  }
  get f3(){
    return this.passwordForm.controls;
  }
  onSubmit(form)
  {
    console.log(form.value);
    this.accountService.getAccountByNumber(form.value.accountnumber).subscribe(data => {
      this.currentAccount = data;
      this.userService.forgotUserPassword(data.UserID).subscribe(data => {
        console.log(data)
        this.requestSent = true;
        this.currentOtp = data;
      })
    })
    // if(((document.getElementById("transactionpwd")as HTMLInputElement).value)!=((document.getElementById("confirmtransactionpwd")as HTMLInputElement).value))
    // {
    //   alert("Transaction passwords are not matching")
    // }
    // else
    // {
    //   alert("Registered successfully!");
    //   this.router.navigate(['userlogin'])
    // }
    
  }

  onSubmit2(form){
    try{
      if(this.currentOtp === form.value.otp){
  
        alert("Reset Password!");
        
        this.showPassword = true;
      }
    }catch{
      alert("Incorrect OTP");
    }
  }

  onSubmit3(form){
    const newAccount = {
      "AccountNumber": this.currentAccount.AccountNumber,
      "UserID": this.currentAccount.UserID,
      "Balance":this.currentAccount.Balance,
      "LoginPassword": form.value.loginpwd,
      "TransactionPassword": form.value.transactionpwd
    }
    this.accountService.updateAccount(newAccount).subscribe(data => {
      alert("Password changed successfully");
      this.router.navigate(['userlogin']);
    })
  }

  confirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        // if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        //     return;
        // }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

}
