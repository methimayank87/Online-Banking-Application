import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotuserid',
  templateUrl: './forgotuserid.component.html',
  styleUrls: ['./forgotuserid.component.css']
})
export class ForgotuseridComponent implements OnInit {

  forgotuseridForm:FormGroup;
  submitted:boolean=false;
  invalidLogin:boolean=false;

  // error_messages = {
  //   'userid': [
  //     { type: 'required', message: 'Account Number is required.' },
  //   ],
  // }


  constructor(private formBuilder: FormBuilder, private router: Router) { }



  onSubmit()
  {
    this.submitted=true;
    if(this.forgotuseridForm.valid)
    {
      this.router.navigate[('/userlogin')]
    }
    else{
      this.invalidLogin=true
    }
    
  }

  ngOnInit(): void {

    this.forgotuseridForm = this.formBuilder.group({
      userid: ['', Validators.required],
     otp: new FormControl(['', Validators.required, Validators.maxLength(6), Validators.minLength(6)])
     //otp:(['', Validators.required])
      
     });

    


 
}

}
