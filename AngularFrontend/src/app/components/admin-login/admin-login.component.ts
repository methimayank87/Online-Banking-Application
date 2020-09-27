import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from"@angular/forms";
import {TokenParams} from 'src/app/model/TokenParams';
import {AuthserviceService} from 'src/app/services/authservice.service';
import {Router} from"@angular/router";

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
  constructor(private router:Router,private formBuilder: FormBuilder,private authservice:AuthserviceService) { }
  DoLogin():void
{
  this.authservice.login(this.username,this.password).subscribe((data:any )=>
    {
      this.tokenparam=data;
      localStorage.setItem('userToken',this.tokenparam.access_token);
      // this.tokenparam=data;
      // this.authservice.AccessToken=this.tokenparam.access_token;
      this.router.navigate(['/admin']);
    });
  
}
  ngOnInit(): void {
    this.adminloginForm = this.formBuilder.group({
      adminid: [Validators.required],
      inputPassword: [Validators.required]
    });
  }

}
