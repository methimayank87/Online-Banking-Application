import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminloginService } from 'src/app/services/admin-login.service';
import {FormBuilder, FormControl, FormGroup, Validators} from"@angular/forms";
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-userstatistics',
  templateUrl: './userstatistics.component.html',
  styleUrls: ['./userstatistics.component.css']
})
export class UserstatisticsComponent implements OnInit {
  userstatisticsform:FormGroup;
  inboundClick = false;
  users: number = 0;
  trans: number = 0;
  imps: number = 0;
  neft: number = 0 ;
  rtgs: number = 0;
  constructor(private formBuilder: FormBuilder,private router : Router,private loginservice: AdminloginService,private adminService: AdminService ) { 
    this.userstatisticsform = this.formBuilder.group({
      startdate: new FormControl('', Validators.required),
      enddate: new FormControl('', Validators.required)
      
    });
  }
  
  ngOnInit(): void {
  }
  Logout()
  {
    this.loginservice.Logout();
    this.router.navigate(['/adminlogin']);
  }
  onSubmit(form){
    const date = {
      "startDate": form.value.startdate,
      "endDate": form.value.enddate
    }
    this.adminService.getUsersByDate(date).subscribe(data => {
      console.log(data)
      this.users = data;
    })
    this.adminService.getTransByDate(date).subscribe(data => {
      this.trans = data;
    })
    this.adminService.getImpsByDate(date).subscribe(data => {
      this.imps = data;
    })
    this.adminService.getRtgsByDate(date).subscribe(data => {
      this.rtgs = data;
    })
    this.adminService.getNeftByDate(date).subscribe(data => {
      this.neft = data;
    })
  }
}
