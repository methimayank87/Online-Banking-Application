import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountdetailsComponent } from './components/accountdetails/accountdetails.component';
import { AccountstatementComponent } from './components/accountstatement/accountstatement.component';
import { AccountsummaryComponent } from './components/accountsummary/accountsummary.component';
import { ChangeIdPasswordComponent } from './components/change-id-password/change-id-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { FundstranferComponent} from './components/fundstranfer/fundstranfer.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { RegisteruserComponent } from './components/registeruser/registeruser.component';
import { ForgotuseridComponent } from './components/forgotuserid/forgotuserid.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { NetbankingComponent } from './components/netbanking/netbanking.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent},
  {path:'accountstatement', component:AccountstatementComponent},
  {path:'fundstransfer', component:FundstranferComponent},
  {path:'userprofile', component:UserprofileComponent},
  {path:'change', component:ChangeIdPasswordComponent},
  {path:'accountdetails', component:AccountdetailsComponent},
  {path:'accountsummary', component:AccountsummaryComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'userlogin', component:UserloginComponent},
  {path:'registeruser', component:RegisteruserComponent},
  {path:'forgotuserid', component:ForgotuseridComponent},
  {path:'homepage' , component:HomepageComponent},
  {path:'forgotpassword', component:ForgotpasswordComponent},
  {path:'netbanking', component:NetbankingComponent},
  {path:'adminlogin', component:AdminLoginComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
