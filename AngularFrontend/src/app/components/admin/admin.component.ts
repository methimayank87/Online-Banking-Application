import { Component, OnInit } from '@angular/core';
import { AdminApproval } from 'src/app/model/AdminApproval';
import { AdminApprovalService } from 'src/app/services/admin-approval.service';
import { AccountService } from 'src/app/services/account.service';
import {Router} from"@angular/router";
import {AuthserviceService} from 'src/app/services/authservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminApprovalService: AdminApprovalService, private accountService: AccountService) { }
  listRequests: AdminApproval[] = [];
  request: AdminApproval;
  isPending: string = "pending";
  ngOnInit(): void {
    this.getRequests();
  }
  getRequests(){
    this.adminApprovalService.getAllRequests().subscribe(data => this.listRequests = data);
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
}
