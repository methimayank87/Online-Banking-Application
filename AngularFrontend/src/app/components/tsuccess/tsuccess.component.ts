import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/model/Transaction';
import { TransactionService } from 'src/app/services/transaction.service';
import { ActivatedRoute, Router } from '@angular/router';
import jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-tsuccess',
  templateUrl: './tsuccess.component.html',
  styleUrls: ['./tsuccess.component.css']
})
export class TsuccessComponent implements OnInit {
  STran: Transaction;
  tranId: Number;
  id: Number;
  pdfName: string;
  constructor(private transactionService: TransactionService, private _Activatedroute:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.tranId = parseInt(params.get('tranId'));
      this.getTransaction(); 
  });
  }
  getTransaction(){
    this.id = parseInt(localStorage.getItem('tranId'));
    this.pdfName = "TransactionSuccess_" + this.id.toString() + ".pdf"
    console.log(this.pdfName);
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

  public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 89;   
      var pageHeight = 195;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
      console.log('working')
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a6'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight) 
      pdf.save(this.pdfName); // Generated PDF   
    });  
  }  

}
