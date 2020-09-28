import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-neft',
  templateUrl: './neft.component.html',
  styleUrls: ['./neft.component.css']
})
export class NeftComponent implements OnInit {
  neftForm:FormGroup;

  constructor(private router:Router,private formBuilder: FormBuilder) { 
    this.neftForm = this.formBuilder.group({
      fromaccount: new FormControl('',Validators.required),
      toaccount: new FormControl('',Validators.required),
      amount: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")])
    });
  }

  ngOnInit(): void {
  }
  get f(){
    return this.neftForm.controls;
  }

}
