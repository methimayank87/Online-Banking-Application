import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-forgotuserid',
  templateUrl: './forgotuserid.component.html',
  styleUrls: ['./forgotuserid.component.css']
})
export class ForgotuseridComponent implements OnInit {

  forgotuseridForm:FormGroup;
  otpForm: FormGroup;
  requestSent: boolean = false;
  current: Number;
  //submitted:boolean=false;
  //invalidLogin:boolean=false;

 

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { 
    this.forgotuseridForm=this.formBuilder.group({

      accountnumber:new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern("^[0-9]*$") ]),
    })
    this.otpForm = this.formBuilder.group({
      otp: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$")])
    })
  }



 
  ngOnInit(): void {
 
}


onSubmit(form)
{
  this.userService.forgotUserId(form.value.accountnumber).subscribe(data => {
    console.log(data);
      this.requestSent = true;
      this.current = data;
  })
}

onSubmit2(form){
  try{
    if(this.current === form.value.otp){
      alert("Check your mail for your user id!");
      this.router.navigate(['']);
    }
  }catch{
    alert("Incorrect OTP");
  }
}

get f(){
  return this.forgotuseridForm.controls;
}
get f2(){
  return this.otpForm.controls;
}

}
