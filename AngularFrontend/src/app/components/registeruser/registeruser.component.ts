import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from"@angular/forms";
import {Router} from"@angular/router";


@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {

  openaccountForm:FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  onSubmit(){
    this.submitted = true;
    if(this.openaccountForm.invalid){
    return;
        }
    
    else{
    this.invalidLogin = true;
        }
      }


   
  

  ngOnInit(): void {
    this.openaccountForm = this.formBuilder.group({
      title: ['',Validators.required],
      firstname: ['',Validators.required],
      lastname: ['',Validators.required],
      fathername: ['',Validators.required],
      mobilenumber: ['',Validators.required],
      aadharnumber: ['',Validators.required],
      dob: ['',Validators.required],
      addrline1: ['',Validators.required],
      addrline2: ['',Validators.required],
      landmark: ['',Validators.required],
      state: ['',Validators.required],
      city: ['',Validators.required],
      pincode: ['',Validators.required],
      peraddrline1: ['',Validators.required],
      peraddrline2: ['',Validators.required],
      perlandmark: ['',Validators.required],
      perstate: ['',Validators.required],
      percity: ['',Validators.required],
      perpincode: ['',Validators.required],
      occupationtype: ['',Validators.required],
      sourceofincome: ['',Validators.required],
      annualincome: ['',Validators.required]

      
    });

  }

}
