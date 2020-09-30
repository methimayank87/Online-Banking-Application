import { Component, OnInit } from '@angular/core';
import { AdminApproval } from 'src/app/model/AdminApproval';
import { AdminApprovalService } from 'src/app/services/admin-approval.service';
import { AccountService } from 'src/app/services/account.service';
import {Router} from"@angular/router";
import {AuthserviceService} from 'src/app/services/authservice.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private adminApprovalService: AdminApprovalService, private accountService: AccountService, private adminService: AdminService) { 
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
      })
      });
    this.accountService.createAccount(userId).subscribe(data => {
      alert("account creation process initiated");
    });
  }

  onSubmit(form){
    this.adminService.sendBulkMail(form.value).subscribe(data => {
      console.log(data)
      alert("Mail sent successfully!")
    })
  }

  onSubmit2(form){
    this.adminService.sendBulkSms(form.value).subscribe(data => {
      console.log(data)
      alert("Sms sent successfully!")
    })
  }
}
