import { Component, OnInit } from '@angular/core';
import {Router} from"@angular/router";
import {AuthserviceService} from 'src/app/services/authservice.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
