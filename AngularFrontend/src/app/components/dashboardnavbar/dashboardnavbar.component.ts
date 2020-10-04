import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import  { Router } from '@angular/router';
import {UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboardnavbar',
  templateUrl: './dashboardnavbar.component.html',
  styleUrls: ['./dashboardnavbar.component.css']
})
export class DashboardnavbarComponent implements OnInit {
  userid: number = parseInt(localStorage.getItem('UserId'));
  userName: string = "user";
  constructor(private loginservice: LoginService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getUserById(this.userid).subscribe(data => {
      this.userName = data.FirstName;
    })
  }

  Logout()
  {
    this.loginservice.Logout();
    this.router.navigate(['/userlogin']);
  }
}
