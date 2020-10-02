import { Component, OnInit } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private bnIdle: BnNgIdleService, private router : Router) { // initiate it in your component constructor
    this.bnIdle.startWatching(600).subscribe((res) => {
      if(res) {
          console.log("session expired");
          localStorage.removeItem('UserId');
          localStorage.removeItem('Accno');
          this.router.navigate(['/userlogin']);
      }
    })
  }

  ngOnInit(): void {

    
  }

}
