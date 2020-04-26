import { Component, OnInit } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { DonationService } from '../services/donation.service';
import { EventEmiterService } from '../services/event-emitter.service';
import { UserService } from '../services/user.service';

@Component({
  templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {

  notificationsCount = 0;
  responseCount = 0;

  private notificationQuery = { "selector": { "type": "request", "isActive": true }, "execution_stats": true, "limit": 21, "skip": 0 }
  private responseQuery = { "selector": { "type": "response", "isActive": true }, "execution_stats": true, "limit": 21, "skip": 0 }

  constructor(private service: DonationService, private event: EventEmiterService, private userService: UserService) { }

  ngOnInit(): void {
    this.service.getDetailsCount(this.notificationQuery).subscribe(response => {
      this.notificationsCount = response.docs.filter(r => r.requester !== this.userService.loggedInUserId).length;
    });

    this.service.getDetailsCount(this.responseQuery).subscribe(response => {
      this.responseCount = response.docs.filter(r => r.requester === this.userService.loggedInUserId).length;
    });

    this.event.notificationsCount.subscribe(value => this.notificationsCount = value);
    this.event.responseCount.subscribe(value => this.responseCount = value);
  }
}