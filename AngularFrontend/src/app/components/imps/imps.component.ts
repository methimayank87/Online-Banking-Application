import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imps',
  templateUrl: './imps.component.html',
  styleUrls: ['./imps.component.css']
})
export class ImpsComponent implements OnInit {

  impsForm:FormGroup;

  constructor(private router:Router,private formBuilder: FormBuilder) {

    this.impsForm = this.formBuilder.group({
      fromaccount: new FormControl('',Validators.required),
      toaccount: new FormControl('',Validators.required),
      amount: new FormControl('',[Validators.required, Validators.pattern("^[0-9]*$")])
    });
   }

  ngOnInit(): void {
  }

  get f(){
    return this.impsForm.controls;
  }


}
