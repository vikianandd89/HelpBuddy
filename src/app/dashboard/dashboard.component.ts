import { Component, OnInit } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { DonationService } from '../services/donation.service';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  notificationsCount = 0;
  responseCount = 0;

  private  notificationQuery = { "selector": { "type": "request", "isActive": true }, "execution_stats": true, "limit": 21, "skip": 0 }
  private  responseQuery = { "selector": { "type": "response", "isActive": true }, "execution_stats": true, "limit": 21, "skip": 0 }


  constructor(private service: DonationService) { }

  ngOnInit(): void {
    this.service.getDetailsCount(this.notificationQuery).subscribe(response => {
      this.notificationsCount = response.docs.length;
    });

    this.service.getDetailsCount(this.responseQuery).subscribe(response => {
      this.responseCount = response.docs.length;
    });
  }
}
