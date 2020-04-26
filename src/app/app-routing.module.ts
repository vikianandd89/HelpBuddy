import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UserComponent } from './user/user.component';
import { HistoryComponent } from './history/history.component';
import { DonateComponent } from './donate/donate.component';
import { WelcomeComponent } from './user/welcome/welcome.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(
    [{ path: '', component: WelcomeComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile/:id', component: RegisterComponent, canActivate: [AuthGuardService] },
    { path: 'register', component: RegisterComponent },
    {
      path: 'home', component: DashboardComponent, canActivate: [AuthGuardService],
      children: [
        { path: '', redirectTo: 'notifications', pathMatch: 'full', canActivate: [AuthGuardService] },
        { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuardService] },
        { path: 'history', component: HistoryComponent, canActivate: [AuthGuardService] },
        { path: 'help', component: DonateComponent, canActivate: [AuthGuardService] },
        { path: 'profile', component: UserComponent, canActivate: [AuthGuardService] },
      ]
    }
    ]
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }