import { Component, OnInit } from '@angular/core';
import { AdminApproval } from 'src/app/model/AdminApproval';
import { AdminApprovalService } from 'src/app/services/admin-approval.service';
import { AccountService } from 'src/app/services/account.service';
import {Router} from"@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { AdminloginService } from 'src/app/services/admin-login.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router : Router,private formBuilder: FormBuilder, private adminApprovalService: AdminApprovalService, private accountService: AccountService, private adminService: AdminService, private loginservice: AdminloginService) { 
    this.bulkMailForm=this.formBuilder.group({
      mailsub :new FormControl('', Validators.required),
      mailbody: new FormControl('', Validators.required)
    })

    this.bulkSmsForm = this.formBuilder.group({
      smsbody: new FormControl('',Validators.required)
    })
  }
  listRequests: AdminApproval[] = [];
  request: AdminApproval;
  isPending: string = "pending";
  bulkMailForm:FormGroup;
  bulkSmsForm: FormGroup;
  ngOnInit(): void {
    this.getRequests();
  }
  getRequests(){
    this.adminApprovalService.getAllRequests().subscribe(data => {
      console.log(data)
      this.listRequests = data
    });
  }
  setApproved(option: string){
    this.isPending = option;
    console.log(this.isPending)
  }

  approveRequest(requestId, userId){
    this.adminApprovalService.getRequestById(requestId).subscribe(data => {
       this.adminApprovalService.updateRequestStatus(data).subscribe(data => {
         this.getRequests();
        alert("Request Aprroved");
        this.accountService.createAccount(userId).subscribe(data => {
          alert("account creation process initiated");
        });
      })
      });
  }

  onSubmit(form){
    const mail = {
      "subject": form.value.mailsub,
      "message": form.value.mailbody
    }
    this.adminService.sendBulkMail(mail).subscribe(data => {
      console.log(data)
      alert("Mail sent successfully!")
    })
  }

  onSubmit2(form){
    const sms = {
      "message": form.value.smsbody
    }
    this.adminService.sendBulkSms(sms).subscribe(data => {
      console.log(data)
      alert("Sms sent successfully!")
    })
  }

  Logout()
  {
    this.loginservice.Logout();
    this.router.navigate(['/adminlogin']);
  }
  viewDetails(userid){
    localStorage.setItem('AuserId',userid);
    this.router.navigate(['/accountdetails'])
  }
  rejectRequest(requestId,userId){
    this.adminApprovalService.getRequestById(requestId).subscribe(data => {
      this.adminApprovalService.rejectRequestStatus(data).subscribe(data => {
        this.getRequests();
       alert("Request Reject");
     })
     });
  }
}
