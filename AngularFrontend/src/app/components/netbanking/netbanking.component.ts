import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-netbanking',
  templateUrl: './netbanking.component.html',
  styleUrls: ['./netbanking.component.css']
})
export class NetbankingComponent implements OnInit {

  netbankingForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder, private router: Router) {
      this.netbankingForm=this.formBuilder.group({
        accountnumber: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12), Validators.pattern("^[0-9]*$")]),
        loginpwd: new FormControl('', [Validators.required,Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{8,}')]),      
        transactionpwd: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{8,}')]),
        confirmtransactionpwd: new FormControl('', [Validators.required]),
        otp: new FormControl('', [Validators.required,  Validators.min(1000), Validators.max(9999), Validators.pattern("^[0-9]*$")]),
        confirmloginpwd: new FormControl('',Validators.required)}, { 
          validators: this.confirmedValidator('loginpwd', 'confirmloginpwd') 
      });

  }

  ngOnInit() {
   
  }

  get f(){
    return this.netbankingForm.controls;
  }

  onSubmit(form)
  {
    console.log(form.value);
    if(((document.getElementById("transactionpwd")as HTMLInputElement).value)!=((document.getElementById("confirmtransactionpwd")as HTMLInputElement).value))
    {
      alert("Transaction passwords are not matching")
    }
    else
    {
      alert("Registered successfully!");
      this.router.navigate(['userlogin'])
    }
    
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
