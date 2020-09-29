import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountdetailsComponent } from './components/accountdetails/accountdetails.component';
import { AccountstatementComponent } from './components/accountstatement/accountstatement.component';
import { AccountsummaryComponent } from './components/accountsummary/accountsummary.component';
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
import { ImpsComponent } from './components/imps/imps.component';
import { AddpayeeComponent } from './components/addpayee/addpayee.component';

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent},
  {path:'accountstatement', component:AccountstatementComponent},
  {path:'fundstransfer', component:FundstranferComponent},
  {path:'userprofile', component:UserprofileComponent},
  {path:'accountdetails', component:AccountdetailsComponent},
  {path:'accountsummary', component:AccountsummaryComponent},
  {path: 'admin', component:AdminComponent},
  {path: 'userlogin', component:UserloginComponent},
  {path:'registeruser', component:RegisteruserComponent},
  {path:'forgotuserid', component:ForgotuseridComponent},
  {path:'' , component:HomepageComponent},
  {path:'forgotpassword', component:ForgotpasswordComponent},
  {path:'netbanking', component:NetbankingComponent},
  {path:'adminlogin', component:AdminLoginComponent},
  {path:'addpayee', component:AddpayeeComponent},
  {path:'imps', component:ImpsComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
