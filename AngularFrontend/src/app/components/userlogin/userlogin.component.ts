import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from"@angular/forms";
import {Router} from"@angular/router";

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  userloginForm:FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.userloginForm = this.formBuilder.group({
      userid: [Validators.required],
      inputPassword: [Validators.required]
    });

  }

}
