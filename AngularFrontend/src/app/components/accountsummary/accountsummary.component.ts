import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/model/Account';
import { Transaction } from 'src/app/model/Transaction';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-accountsummary',
  templateUrl: './accountsummary.component.html',
  styleUrls: ['./accountsummary.component.css']
})
export class AccountsummaryComponent implements OnInit {
  account: Account;
  trans: Transaction[];

  constructor(private accountService: AccountService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getAccount();
    this.getTransactions();
  }

  getAccount(){
    const accountNumber = parseInt(localStorage.getItem('Accno'));
    this.accountService.getAccountByNumber(accountNumber).subscribe(data => {
      this.account = data;
    })
  }

  getTransactions(){
    const accountNumber = parseInt(localStorage.getItem('Accno'));
    this.transactionService.getLast(accountNumber).subscribe(data => {
      this.trans = data;
    })
  }

}
