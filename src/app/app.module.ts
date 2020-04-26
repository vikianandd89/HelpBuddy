import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HistoryComponent } from './history/history.component';
import { UserComponent } from './user/user.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DonateComponent } from './donate/donate.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ResponseService } from './services/response.service';
import { UserService } from './services/user.service';
import { DonationService } from './services/donation.service';
import { WelcomeComponent } from './user/welcome/welcome.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EventEmiterService } from './services/event-emitter.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NotificationsComponent,
    HistoryComponent,
    UserComponent,
    DonateComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [DonationService, ResponseService, UserService, EventEmiterService],
  bootstrap: [AppComponent]
})
export class AppModule { }