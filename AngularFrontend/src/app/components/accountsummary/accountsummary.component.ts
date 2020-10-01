import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/model/Account';
@Component({
  selector: 'app-accountsummary',
  templateUrl: './accountsummary.component.html',
  styleUrls: ['./accountsummary.component.css']
})
export class AccountsummaryComponent implements OnInit {
  account: Account;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAccount();
  }

  getAccount(){
    const accountNumber = parseInt(localStorage.getItem('Accno'));
    this.accountService.getAccountByNumber(accountNumber).subscribe(data => {
      this.account = data;
    })
  }

}
