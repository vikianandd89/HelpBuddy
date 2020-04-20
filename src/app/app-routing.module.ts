import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { DonationsComponent } from './donations/donations.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(
    [{path: '', component: IntroComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'dashboard', component:DashboardComponent, 
  children: [
    {path: '', component:NotificationsComponent},
    {path: 'notifications', component:NotificationsComponent},
    {path: 'donations', component:DonationsComponent},
  
  {path: 'personal-details', component:PersonalDetailsComponent},
  ]},
  
]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
