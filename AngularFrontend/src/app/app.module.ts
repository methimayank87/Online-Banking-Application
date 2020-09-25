import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
