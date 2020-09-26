import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from"@angular/forms";
import {TokenParams} from 'src/app/model/TokenParams';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  adminloginForm:FormGroup;
  tokenparam: TokenParams;
  constructor(private formBuilder: FormBuilder) { }
  DoLogin():void
{
  
}
  ngOnInit(): void {
    this.adminloginForm = this.formBuilder.group({
      adminid: [Validators.required],
      inputPassword: [Validators.required]
    });
  }

}
