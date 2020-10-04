import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from"@angular/forms";
import {Router} from"@angular/router";
// import { UserService } from 'src/app/services/user.service';
// import { User } from 'src/app/model/User';
import { AccountService } from 'src/app/services/account.service';
// import { Account } from 'src/app/model/Account';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  loginCounter: number = 0;
  userloginForm:FormGroup;
  userOtpForm: FormGroup;
  current: Number;
  loggedIn: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService, private accountService: AccountService) {

    this.userloginForm = this.formBuilder.group({
      userid:new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.userOtpForm = this.formBuilder.group({
      otp: new FormControl('',[Validators.required,Validators.min(1000), Validators.max(9999)])
    })
   }

  ngOnInit(): void {
   
  }

  onSubmit(form)
  {
    const login = {
      "Id": form.value.userid,
      "Password": form.value.password
    }
      this.loginService.loginUser(login).subscribe(data => {
        console.log(data);
          this.loggedIn = true;
          this.current = data;
          localStorage.setItem('UserId',form.value.userid)
          sessionStorage.setItem('userData', JSON.stringify(data));
          this.accountService.getAccountById(form.value.userid).subscribe(data => {
            localStorage.setItem('Accno', data.AccountNumber);
          })
      })
    // this.accountService.getAccountById(form.value.userid).subscribe(data => {
    //   try{
    //     this.currentAccount = data;
    //     if(this.currentAccount.LoginPassword === form.value.password){
    //         alert("Successfully logged in!");
    //         this.router.navigate(['dashboard']);
    //     }else{
    //       alert("Wrong Password")
    //     }
    //   } catch(err){
    //     console.log(err)
    //         alert("User not Found")
    //   }
      
    // })
  }

  onSubmit2(form){
    try{
      if(this.current === form.value.otp){
        alert("Successfully logged in!");
        this.loginCounter = 0;
        this.router.navigate(['dashboard']);

      }
    }catch{
      alert("Incorrect OTP");
    }
  }
  get f(){
    return this.userloginForm.controls;
  }
  setLogin() {
    this.loginCounter += 1;
    console.log(this.loginCounter)
    localStorage.setItem('logCount', this.loginCounter.toString());
    if (this.loginCounter >= 3 )
    {
      alert("Account Locked!");
      this.router.navigate(['/forgotpassword']);

    }
    else 
    {
      this.loginCounter+=1;
    }
  }


}
