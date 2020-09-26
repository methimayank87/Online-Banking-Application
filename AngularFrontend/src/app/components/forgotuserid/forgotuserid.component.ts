import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotuserid',
  templateUrl: './forgotuserid.component.html',
  styleUrls: ['./forgotuserid.component.css']
})
export class ForgotuseridComponent implements OnInit {

  forgotuseridForm:FormGroup;
  //submitted:boolean=false;
  //invalidLogin:boolean=false;

 

  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.forgotuseridForm=this.formBuilder.group({

      accountnumber:new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$") ]),

      otp: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern("^[0-9]*$")])

    })
  }



 
  ngOnInit(): void {
 
}

get f(){
  return this.forgotuseridForm.controls;
}


onSubmit()
{
  console.log(this.forgotuseridForm.value);

}

}
