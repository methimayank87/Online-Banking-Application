import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/model/Transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-tsuccess',
  templateUrl: './tsuccess.component.html',
  styleUrls: ['./tsuccess.component.css']
})
export class TsuccessComponent implements OnInit {
  STran: Transaction;
  tranId: Number;
  id: Number;
  constructor(private transactionService: TransactionService, private _Activatedroute:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.tranId = parseInt(params.get('tranId'));
      this.getTransaction(); 
  });
  }
  getTransaction(){
    this.id = parseInt(localStorage.getItem('tranId'));
    this.transactionService.getTransactionById(this.id).subscribe(data => {
      this.STran = {
        "TransactionMode": "IMPS",
        "SenderAccount": data.SenderAccount,
        "ReceiverAccount": data.ReceiverAccount,
        "Amount": data.Amount,
        "TransactionDate": data.TransactionDate,
        "Remarks": data.Remarks
      } 
    });
  }

  navigate(){
    localStorage.removeItem('tranId')
    this.router.navigate(['fundstransfer'])
  }

}
