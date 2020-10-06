import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgotpasswordForm:FormGroup;
  otpForm: FormGroup;
  setPwdForm: FormGroup;
  requestSent: boolean = false;
  current: Number;
  currentUserId: number ;
  showPassword: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private accountService: AccountService) { 
    this.forgotpasswordForm=this.formBuilder.group({
      userid:new FormControl('', Validators.required),
    })
    this.otpForm = this.formBuilder.group({
      otp: new FormControl('', [Validators.required, Validators.min(1000), Validators.max(9999), Validators.pattern("^[0-9]*$")])
    })
    this.setPwdForm = this.formBuilder.group({
      loginpwd: new FormControl('', [Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{8,}')]), 
      confirmloginpwd: new FormControl('',Validators.required)}, { 
        validators: this.confirmedValidator('loginpwd', 'confirmloginpwd') 
    });
  }



 
  ngOnInit(): void {
 
}

get f(){
  return this.forgotpasswordForm.controls;
}
get f2(){
  return this.otpForm.controls;
}

get f3(){
  return this.setPwdForm.controls;
}
onSubmit(form)
{
  this.currentUserId = form.value.userid;
  this.userService.forgotUserPassword(form.value.userid).subscribe(data => {
    console.log(data)
      this.requestSent = true;
      this.current = data;
  })
}

onSubmit2(form){
  console.log("hello")
  try{
    if(this.current === form.value.otp){

      alert("Reset Password!");
      
      this.showPassword = true;
    }
  }catch{
    alert("Incorrect OTP");
  }
}

onSubmit3(form){
  this.accountService.getAccountById(this.currentUserId).subscribe(data => {
    const newAccount = {
      "AccountNumber": data.AccountNumber,
      "UserID": data.UserID,
      "Balance": data.Balance,
      "LoginPassword": form.value.loginpwd,
      "TransactionPassword": data.TransactionPassword
    }
    this.accountService.updateAccount(newAccount).subscribe(data => {
      alert("Password changed successfully");
      this.router.navigate(['userlogin']);
    })
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
