import { Component, OnInit } from '@angular/core';
import { AdminApproval } from 'src/app/model/AdminApproval';
import { AdminApprovalService } from 'src/app/services/admin-approval.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminApprovalService: AdminApprovalService, private accountService: AccountService) { }
  listRequests: AdminApproval[] = [];
  request: AdminApproval;
  ngOnInit(): void {
    this.getRequests();
  }
  getRequests(){
    this.adminApprovalService.getAllRequests().subscribe(data => this.listRequests = data);
  }


  approveRequest(requestId, userId){
    this.adminApprovalService.getRequestById(requestId).subscribe(data => {
       this.adminApprovalService.updateRequestStatus(data).subscribe(data => {
        alert("Request Aprroved");
      })
      });
    this.accountService.createAccount(userId).subscribe(data => {
      alert("account creation process initiated");
    });
  }
}
