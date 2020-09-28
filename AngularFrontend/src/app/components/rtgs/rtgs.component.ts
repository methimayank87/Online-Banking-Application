import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rtgs',
  templateUrl: './rtgs.component.html',
  styleUrls: ['./rtgs.component.css']
})
export class RtgsComponent implements OnInit {
  rtgsForm:FormGroup;

  constructor(private router:Router,private formBuilder: FormBuilder) { 
    this.rtgsForm = this.formBuilder.group({
      fromaccount: new FormControl('',Validators.required),
      toaccount: new FormControl('',Validators.required),
      amount: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")])
    });
  }

  ngOnInit(): void {
  }
  get f(){
    return this.rtgsForm.controls;
  }

}
