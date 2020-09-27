import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from"@angular/forms";
import {Router} from"@angular/router";

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  userloginForm:FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {

    this.userloginForm = this.formBuilder.group({
      userid:new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
   
  }

  onSubmit(form)
  {
    alert("Successfully logged in!");
    this.router.navigate(['dashboard']);
  }

  get f(){
    return this.userloginForm.controls;
  }


}
