import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from"@angular/forms";
import {Router} from"@angular/router";
import { UserService } from 'src/app/services/user.service';
import { RaddressService } from 'src/app/services/raddress.service';
import { PaddressService } from 'src/app/services/paddress.service';
import { AdminApprovalService } from 'src/app/services/admin-approval.service';
@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {

  openaccountForm:FormGroup;
  submitted: boolean = false;
  invalidRegister: boolean = false;
  currentUserId:number = 0;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService, private raddressService: RaddressService, private paddressService: PaddressService, private adminApprovalService: AdminApprovalService) { }

  onSubmit(form){
    this.submitted = true;
    // if(this.openaccountForm.invalid)
    // {
    //   return;
    // }
    // else{
    // this.invalidRegister = true;
    // }
    console.log(form.value)
    this.userService.registerUser(form.value).subscribe(data =>{
      this.currentUserId = data.UserID
      this.raddressService.registerAddress(form.value,data.UserID);
      this.paddressService.registerAddress(form.value,data.UserID);
      alert("User added successfully");
    });
    this.adminApprovalService.sendRequest(this.currentUserId).subscribe(data => {
      alert("Account Creation Request Generated");
    })
  }

  ngOnInit(): void {
    this.openaccountForm=this.formBuilder.group({

      title:new FormControl('', Validators.required),
      firstname: new FormControl ('',[Validators.required, Validators.pattern("^[a-zA-Z]*$")]),
       middlename: new FormControl (''),
      lastname: new FormControl ('',[Validators.required, Validators.pattern("^[a-zA-Z]*$")]),
      gender: new FormControl('',Validators.required),
       email: new FormControl ('',[Validators.required]),
      fathername: new FormControl ('',[Validators.required, Validators.pattern("^[a-zA-Z]*$")]),
      mobilenumber: new FormControl ('',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      aadharnumber: new FormControl ('',[Validators.required, Validators.pattern("^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$")]),
      dob: new FormControl ('',Validators.required),
      addrline1: new FormControl ('',Validators.required),
      addrline2: new FormControl ('',Validators.required),
      landmark: new FormControl ('',Validators.required),
      state: new FormControl ('',Validators.required),
      city: new FormControl ('',Validators.required),
      pincode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]),

      peraddrline1: new FormControl ('',Validators.required),
      peraddrline2: new FormControl ('',Validators.required),
      perlandmark: new FormControl ('',Validators.required),
      perstate: new FormControl ('',Validators.required),
      percity: new FormControl ('',Validators.required),
      perpincode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]),
      occupationtype: new FormControl ('',Validators.required),
      sourceofincome: new FormControl ('',Validators.required),
      annualincome: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
       debitCard: new FormControl (''),
       netbanking: new FormControl ('')
    })

  }


  checkAddress(form)
  {
    // if(this.peraddrline2=""){
    // this.peraddrline2= ((document.getElementById("addrline1")as HTMLInputElement).value);
    // }

    ((document.getElementById("peraddrline1")as HTMLInputElement).value)=((document.getElementById("addrline1")as HTMLInputElement).value);
    ((document.getElementById("peraddrline2")as HTMLInputElement).value)=((document.getElementById("addrline2")as HTMLInputElement).value);
    ((document.getElementById("perlandmark")as HTMLInputElement).value)=((document.getElementById("landmark")as HTMLInputElement).value);
    ((document.getElementById("perstate")as HTMLInputElement).value)=((document.getElementById("state")as HTMLInputElement).value);
    ((document.getElementById("percity")as HTMLInputElement).value)=((document.getElementById("city")as HTMLInputElement).value);
    ((document.getElementById("perpincode")as HTMLInputElement).value)=((document.getElementById("pincode")as HTMLInputElement).value);

    form.value.peraddrline1 = form.value.addrline1;
    form.value.peraddrline2 = form.value.addrline2;
    form.value.perlandmark = form.value.landmark;
    form.value.perstate = form.value.state;
    form.value.percity = form.value.city;
    form.value.perpincode = form.value.pincode;
    
  }

  get f(){
    return this.openaccountForm.controls;
  }

}
