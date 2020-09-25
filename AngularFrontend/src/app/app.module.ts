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
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { RegisteruserComponent } from './components/registeruser/registeruser.component';

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
    RegisteruserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
