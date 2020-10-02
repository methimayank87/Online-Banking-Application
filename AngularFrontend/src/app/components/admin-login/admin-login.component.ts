import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from"@angular/forms";
import {TokenParams} from 'src/app/model/TokenParams';
import {Router} from"@angular/router";
import { AdminloginService } from 'src/app/services/admin-login.service'
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  adminloginForm:FormGroup;
  tokenparam: TokenParams;
  username:string;
  password:string;
  constructor(private router:Router,private formBuilder: FormBuilder, private adminService: AdminloginService) {
    this.adminloginForm = this.formBuilder.group({
      adminid: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });
   }


   doLogin() {
    const admin={
      "Id":this.adminloginForm.value.adminid,
      "Password":this.adminloginForm.value.password
    };
    // this.submitted=true;
    this.adminService.doLogin(admin).subscribe(result => {
      console.log(this.adminloginForm.value);
      sessionStorage.setItem('adminData', JSON.stringify(result));
      this.router.navigate(['/admin']);
      alert('Success');
    }, (error) => {
      console.log(error);
      alert("Unsuccessfull")
    });}

  ngOnInit(): void {
   
  }
  get f(){
    return this.adminloginForm.controls;
  }

}
