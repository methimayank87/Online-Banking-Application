import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editraddress',
  templateUrl: './editraddress.component.html',
  styleUrls: ['./editraddress.component.css']
})
export class EditraddressComponent implements OnInit {

  editraddressForm:FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.editraddressForm=this.formBuilder.group({
      addrline1: new FormControl ('',Validators.required),
      addrline2: new FormControl ('',Validators.required),
      landmark: new FormControl ('',Validators.required),
      state: new FormControl ('',Validators.required),
      city: new FormControl ('',Validators.required),
      pincode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern("^[0-9]*$")])
    })
   }

  ngOnInit(): void {
  }

  onSubmit(form)
  {

  }

  get f(){
    return this.editraddressForm.controls;
  }

}
