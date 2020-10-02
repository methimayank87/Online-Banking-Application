import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import  { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginservice: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  Logout()
  {
    this.loginservice.Logout();
    this.router.navigate(['/userlogin']);
  }

}
