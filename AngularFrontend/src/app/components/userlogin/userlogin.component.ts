import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from"@angular/forms";
import {Router} from"@angular/router";
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/User';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/model/Account';
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  userloginForm:FormGroup;
  currentAccount: Account;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private accountService: AccountService) {

    this.userloginForm = this.formBuilder.group({
      userid:new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
   
  }

  onSubmit(form)
  {
    this.accountService.getAccountById(form.value.userid).subscribe(data => {
      try{
        this.currentAccount = data;
        if(this.currentAccount.LoginPassword === form.value.password){
            alert("Successfully logged in!");
            this.router.navigate(['dashboard']);
        }else{
          alert("Wrong Password")
        }
      } catch(err){
        console.log(err)
            alert("User not Found")
      }
      
    })
  }

  get f(){
    return this.userloginForm.controls;
  }


}
