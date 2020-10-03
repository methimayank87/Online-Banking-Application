import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  edituserForm:FormGroup;


  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.edituserForm=this.formBuilder.group({

      title:new FormControl('', Validators.required),
      firstname: new FormControl ('',[Validators.required, Validators.pattern("^[a-zA-Z]*$")]),
       middlename: new FormControl (''),
      lastname: new FormControl ('',[Validators.required, Validators.pattern("^[a-zA-Z]*$")]),
      gender: new FormControl('',Validators.required),
       email: new FormControl ('',[Validators.required , Validators.pattern("^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$")]),
      fathername: new FormControl ('',[Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]),
      mobilenumber: new FormControl ('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      aadharnumber: new FormControl ('',[Validators.required, Validators.pattern("^[1-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$")]),
      dob: new FormControl ('',Validators.required),
      occupationtype: new FormControl ('',Validators.required),
      sourceofincome: new FormControl ('',Validators.required),
      annualincome: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")])

    })
  }

  ngOnInit(): void {
  }

  onSubmit(form)
  {

  }

  get f(){
    return this.edituserForm.controls;
  }

}
