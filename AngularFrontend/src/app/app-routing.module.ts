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
import { NeftComponent } from './components/neft/neft.component';
import { RtgsComponent } from './components/rtgs/rtgs.component';
import { AuthenticationGuard } from './authentication.guard';
import { Authentication1Guard } from './authentication1.guard';
import { EditpaddressComponent } from './components/editpaddress/editpaddress.component';
import { EditraddressComponent } from './components/editraddress/editraddress.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import { TsuccessComponent } from './components/tsuccess/tsuccess.component';
import { UserstatisticsComponent } from './components/userstatistics/userstatistics.component';

const routes: Routes = [
  {path:'accountstatement', component:AccountstatementComponent},
  {path:'fundstransfer', component:FundstranferComponent},
  {path:'userprofile', component:UserprofileComponent},
  {path:'accountdetails', component:AccountdetailsComponent},
  {path:'accountsummary', component:AccountsummaryComponent},
  {path: 'userlogin', component:UserloginComponent},
  {path:'registeruser', component:RegisteruserComponent},
  {path:'forgotuserid', component:ForgotuseridComponent},
  {path:'' , component:HomepageComponent},
  {path:'forgotpassword', component:ForgotpasswordComponent},
  {path:'netbanking', component:NetbankingComponent},
  {path:'adminlogin', component:AdminLoginComponent},
  {path:'addpayee', component:AddpayeeComponent},
  {path:'imps', component:ImpsComponent},
  {path:'neft',component:NeftComponent},
  {path:'rtgs',component: RtgsComponent},
  {path: 'admin', component:AdminComponent,canActivate:[AuthenticationGuard]},
  {path:'dashboard', component:DashboardComponent,canActivate:[Authentication1Guard]},
  {path:'edituser', component:EdituserComponent},
  {path:'editraddress', component:EditraddressComponent},
  {path:'editpaddress', component:EditpaddressComponent},
  {path:'transactionSuccess/:id',component:TsuccessComponent},
  {path:'userstatistics', component:UserstatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
