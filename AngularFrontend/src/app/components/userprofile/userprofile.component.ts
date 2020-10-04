import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { Raddress } from 'src/app/model/Raddress';
import { Paddress }  from 'src/app/model/Paddress';
import { UserService } from 'src/app/services/user.service'
import { RaddressService }  from 'src/app/services/raddress.service';
import { PaddressService }  from 'src/app/services/paddress.service';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private userService: UserService, private raddressService: RaddressService, private paddressService: PaddressService) { }
  user : User;
  raddress: Raddress;
  paddress: Paddress;
  baseUrl: string = "https://localhost:44306/api/UploadImage/";
  profileImage: string;
  ngOnInit(): void {
    this.getUser();
    this.getRaddress();
    this.getPaddress();
  }
  getUser(){
    const userid = localStorage.getItem('UserId')
    this.profileImage = this.baseUrl + userid
    this.userService.getUserById(userid).subscribe(data => {
      this.user = data;
    })
  }
  getRaddress(){
    const userid = localStorage.getItem('UserId')
    this.raddressService.getAddress(userid).subscribe(data => {
      this.raddress = data;
    })
  }
  getPaddress(){
    const userid = localStorage.getItem('UserId')
    this.paddressService.getAddress(userid).subscribe(data => {
      this.paddress = data;
    })
  }
}
