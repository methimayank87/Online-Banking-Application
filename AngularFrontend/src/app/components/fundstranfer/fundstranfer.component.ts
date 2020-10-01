import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Beneficiary } from 'src/app/model/Beneficiary';

@Component({
  selector: 'app-fundstranfer',
  templateUrl: './fundstranfer.component.html',
  styleUrls: ['./fundstranfer.component.css']
})
export class FundstranferComponent implements OnInit {
  listBeneficiaries: Beneficiary[];
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getBeneficiaries()
  }
  getBeneficiaries(){
    this.accountService.getAllBeneficiaries().subscribe(data => this.listBeneficiaries = data);
  }

}
