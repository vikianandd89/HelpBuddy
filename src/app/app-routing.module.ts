import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UserComponent } from './user/user.component';
import { HistoryComponent } from './history/history.component';
import { DonateComponent } from './donate/donate.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(
    [{ path: '', component: LoginComponent },
    { path: 'profile/:id', component: RegisterComponent },
    { path: 'register', component: RegisterComponent },
    {
      path: 'home', component: DashboardComponent,
      children: [
        { path: '', component: NotificationsComponent },
        { path: 'notifications', component: NotificationsComponent },
        { path: 'history', component: HistoryComponent },
        { path: 'help', component: DonateComponent },
        { path: 'profile', component: UserComponent },
      ]
    }
    ]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
