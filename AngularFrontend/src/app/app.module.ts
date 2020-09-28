import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountdetailsComponent } from './components/accountdetails/accountdetails.component';
import { AccountstatementComponent } from './components/accountstatement/accountstatement.component';
import { AccountsummaryComponent } from './components/accountsummary/accountsummary.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FundstranferComponent } from './components/fundstranfer/fundstranfer.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { ChangeIdPasswordComponent } from './components/change-id-password/change-id-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { RegisteruserComponent } from './components/registeruser/registeruser.component';
import { ForgotuseridComponent } from './components/forgotuserid/forgotuserid.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import {AuthserviceService} from 'src/app/services/authservice.service';
import { NetbankingComponent } from './components/netbanking/netbanking.component';
import { AddpayeeComponent } from './components/addpayee/addpayee.component';
import { ImpsComponent } from './components/imps/imps.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountdetailsComponent,
    AccountstatementComponent,
    AccountsummaryComponent,
    DashboardComponent,
    FundstranferComponent,
    UserprofileComponent,
    ChangeIdPasswordComponent,
    AdminComponent,
    UserloginComponent,
    RegisteruserComponent,
    ForgotuseridComponent,
    HomepageComponent,
    AdminLoginComponent,
    NavbarComponent,
   
    ForgotpasswordComponent,
    ForgotpasswordComponent,
    NetbankingComponent,
    AddpayeeComponent,
    ImpsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
