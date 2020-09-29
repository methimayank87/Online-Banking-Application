import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-addpayee',
  templateUrl: './addpayee.component.html',
  styleUrls: ['./addpayee.component.css']
})
export class AddpayeeComponent implements OnInit {

  addpayeeForm:FormGroup;

  constructor(private formbuilder:FormBuilder, private router:Router, private accountService: AccountService) { 

    this.addpayeeForm = this.formbuilder.group({
      beneficiaryname: new FormControl('',Validators.required),
      beneficiarynumber: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")]),
      savebeneficiarynumber: new FormControl('',Validators.required),
      rebeneficiarynumber: new FormControl('',Validators.required),
      nickname: new FormControl('',Validators.required)

    },
    { 
      validators: this.confirmedValidator('beneficiarynumber', 'rebeneficiarynumber') 
    }
    );
  }

  ngOnInit(): void {
  }

  get f(){
    return this.addpayeeForm.controls;
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

  onSubmit(form){
    const beneficiary = {
      "Name": form.value.beneficiaryname,
      "BenAccountNumber": form.value.beneficiarynumber,
      "NickName": form.value.nickname,
      "UserAccountNumber": localStorage.getItem("Accno")
    }
    console.log(beneficiary);
    this.accountService.addBeneficiary(beneficiary).subscribe(data => {
      console.log(data)
      alert("Beneficiary Added Successfully");
    })
  }

}
