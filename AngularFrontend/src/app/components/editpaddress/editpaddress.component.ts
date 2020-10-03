import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editpaddress',
  templateUrl: './editpaddress.component.html',
  styleUrls: ['./editpaddress.component.css']
})
export class EditpaddressComponent implements OnInit {

  editpaddressForm:FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.editpaddressForm=this.formBuilder.group({
      peraddrline1: new FormControl ('',Validators.required),
      peraddrline2: new FormControl ('',Validators.required),
      perlandmark: new FormControl ('',Validators.required),
      perstate: new FormControl ('',Validators.required),
      percity: new FormControl ('',Validators.required),
      perpincode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")])
    })
   }

  ngOnInit(): void {
  }

  get f(){
    return this.editpaddressForm.controls;
  }

  onSubmit(form)
  {
    
  }
}
