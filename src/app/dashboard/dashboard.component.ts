import { Component, OnInit } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { DonationService } from '../services/donation.service';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  notificationsCount = 0;
  responseCount = 0;

  constructor(private service: DonationService) { }

  ngOnInit(): void {
    this.service.getNotifications().subscribe(response => {
      this.notificationsCount = response.docs.length;
    });

    this.service.getResponse().subscribe(response => {
      this.responseCount = response.docs.length;
    });
  }
}
