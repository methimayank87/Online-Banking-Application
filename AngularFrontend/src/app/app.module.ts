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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { RegisteruserComponent } from './components/registeruser/registeruser.component';
import { ForgotuseridComponent } from './components/forgotuserid/forgotuserid.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AuthguardService } from 'src/app/services/auth-guard.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { NetbankingComponent } from './components/netbanking/netbanking.component';
import { AddpayeeComponent } from './components/addpayee/addpayee.component';
import { ImpsComponent } from './components/imps/imps.component';
import { NeftComponent } from './components/neft/neft.component';
import { RtgsComponent } from './components/rtgs/rtgs.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardnavbarComponent } from './components/dashboardnavbar/dashboardnavbar.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { EdituserComponent } from './components/edituser/edituser.component';
import { EditraddressComponent } from './components/editraddress/editraddress.component';
import { EditpaddressComponent } from './components/editpaddress/editpaddress.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountdetailsComponent,
    AccountstatementComponent,
    AccountsummaryComponent,
    DashboardComponent,
    FundstranferComponent,
    UserprofileComponent,
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
    ImpsComponent,
    NeftComponent,
    RtgsComponent,
    SidebarComponent,
    DashboardnavbarComponent,
    EdituserComponent,
    EditraddressComponent,
    EditpaddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthguardService,
    BnNgIdleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
