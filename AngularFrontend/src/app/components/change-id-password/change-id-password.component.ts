import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from"@angular/forms";
import {Router} from"@angular/router";

@Component({
  selector: 'app-change-id-password',
  templateUrl: './change-id-password.component.html',
  styleUrls: ['./change-id-password.component.css']
})
export class ChangeIdPasswordComponent implements OnInit {

  setpasswordForm:FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  onSubmit(){
    this.submitted = true;
    if(this.setpasswordForm.invalid){
    return;
        }
    if(this.setpasswordForm.controls.loginpwd.value ==this.setpasswordForm.controls.confirmlogin.value  && this.setpasswordForm.controls.transactionpwd.value ==this.setpasswordForm.controls.confirmtransaction.value){
              // localStorage.setItem("username",this.setpasswordForm.controls.email.value);
              // this.router.navigate(['list-user']);
              alert("Password successfully changed");
              this.router.navigate(['dashboard'])

        }
    else{
    this.invalidLogin = true;
        }
      }

  ngOnInit(): void {

    this.setpasswordForm = this.formBuilder.group({
      loginpwd: ['', Validators.required],
      confirmlogin: ['', Validators.required],
      transactionpwd: ['', Validators.required],
      confirmtransaction: ['', Validators.required]
      
    });
  }

}
