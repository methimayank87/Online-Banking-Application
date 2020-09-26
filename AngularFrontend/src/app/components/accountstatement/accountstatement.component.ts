import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accountstatement',
  templateUrl: './accountstatement.component.html',
  styleUrls: ['./accountstatement.component.css']
})
export class AccountstatementComponent implements OnInit {

  accountstatementform:FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  onSubmit()
  {
    this.submitted=true    
  
  }


  ngOnInit(): void {

    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });

  this.accountstatementform = this.formBuilder.group({
    startdate: ['', Validators.required],
    enddate: ['', Validators.required]
    
  });
  }
}


