import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  forgotpasswordForm:FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.forgotpasswordForm=this.formBuilder.group({

      userid:new FormControl('', Validators.required),

      otp: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$")])

    })
  }



 
  ngOnInit(): void {
 
}

get f(){
  return this.forgotpasswordForm.controls;
}


onSubmit()
{
  console.log(this.forgotpasswordForm.value);

}
}
