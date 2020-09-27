import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from"@angular/forms";
import {Router} from"@angular/router";
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  userloginForm:FormGroup;
  currentUser: User;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) {

    this.userloginForm = this.formBuilder.group({
      userid:new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
   }

  ngOnInit(): void {
   
  }

  onSubmit(form)
  {
    // this.userService.getUserById(form.value.userid).subscribe(data => {
    //   try{
    //     this.currentUser = data;
    //     this.userService.loginUser(this.currentUser, form.value.password).subscribe(data => {
    //       try{
    //         alert("Successfully logged in!");
    //       }catch(err){
    //         console.log(err)
    //         alert("Wrong Password")
    //       }
         
    //     })
    //   } catch(err){
    //     console.log(err)
    //         alert("User not Found")
    //   }
      
    // })
    
    this.router.navigate(['dashboard']);
  }

  get f(){
    return this.userloginForm.controls;
  }


}
