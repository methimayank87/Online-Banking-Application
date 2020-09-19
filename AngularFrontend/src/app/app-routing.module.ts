import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountdetailsComponent } from './components/accountdetails/accountdetails.component';
import { AccountstatementComponent } from './components/accountstatement/accountstatement.component';
import { AccountsummaryComponent } from './components/accountsummary/accountsummary.component';
import { ChangeIdPasswordComponent } from './components/change-id-password/change-id-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { FundstranferComponent} from './components/fundstranfer/fundstranfer.component';

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent},
  {path:'accountstatement', component:AccountstatementComponent},
  {path:'fundstransfer', component:FundstranferComponent},
  {path:'userprofile', component:UserprofileComponent},
  {path:'change', component:ChangeIdPasswordComponent},
  {path:'accountdetails', component:AccountdetailsComponent},
  {path:'accountsummary', component:AccountsummaryComponent},
  {path:'',redirectTo:'/dashboard' ,pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
