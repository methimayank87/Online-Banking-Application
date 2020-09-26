import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from"@angular/forms";
import {Router} from"@angular/router";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {

  openaccountForm:FormGroup;
  submitted: boolean = false;
  invalidRegister: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  onSubmit(form){
    this.submitted = true;
    if(this.openaccountForm.invalid)
    {
      return;
    }
    else{
    this.invalidRegister = true;
    }
    console.log(form.value)
    this.userService.registerUser(form.value).subscribe(data =>{
      alert("User added successfully");
    });
  }

  ngOnInit(): void {
    this.openaccountForm = this.formBuilder.group({
      title: ['',Validators.required],
      firstname: ['',Validators.required],
      middlename:[''],
      lastname: ['',Validators.required],
      gender: ['',Validators.required],
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
      peraddress: [''],
      peraddrline1: ['',Validators.required],
      peraddrline2: ['',Validators.required],
      perlandmark: ['',Validators.required],
      perstate: ['',Validators.required],
      percity: ['',Validators.required],
      perpincode: ['',Validators.required],
      occupationtype: ['',Validators.required],
      sourceofincome: ['',Validators.required],
      annualincome: ['',Validators.required],
      debitCard: [''],
      netbanking: ['']
    });

  }


  checkAddress(form)
  {
    console.log(form.value);
    // if(this.peraddrline2=""){
    // this.peraddrline2= ((document.getElementById("addrline1")as HTMLInputElement).value);
    // }

    ((document.getElementById("peraddrline1")as HTMLInputElement).value)=((document.getElementById("addrline1")as HTMLInputElement).value);
    ((document.getElementById("peraddrline2")as HTMLInputElement).value)=((document.getElementById("addrline2")as HTMLInputElement).value);
    ((document.getElementById("perlandmark")as HTMLInputElement).value)=((document.getElementById("landmark")as HTMLInputElement).value);
    ((document.getElementById("perstate")as HTMLInputElement).value)=((document.getElementById("state")as HTMLInputElement).value);
    ((document.getElementById("percity")as HTMLInputElement).value)=((document.getElementById("city")as HTMLInputElement).value);
    ((document.getElementById("perpincode")as HTMLInputElement).value)=((document.getElementById("pincode")as HTMLInputElement).value);
    
  }

}
