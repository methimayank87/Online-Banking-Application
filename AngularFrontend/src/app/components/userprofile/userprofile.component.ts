import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service'
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private userService: UserService) { }
  user : User;
  ngOnInit(): void {
    this.getUser();
  }
  getUser(){
    const userid = localStorage.getItem('UserId')
    this.userService.getUserById(userid).subscribe(data => {
      this.user = data;
    })
  }
}
