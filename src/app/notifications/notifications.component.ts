import { Component, OnInit } from '@angular/core';
import { DonationService } from '../services/donation.service';
import { UserService } from '../services/user.service';

@Component({
  templateUrl: './notifications.component.html'
})

export class NotificationsComponent implements OnInit {

  notifications: any[];
  selectedRequest: any;
  requester: any;

  constructor(private donation: DonationService, private userService: UserService) { }

  ngOnInit(): void {
    this.donation.getNotifications().subscribe(response => {
      this.notifications = response.docs;
      this.notifications.forEach(notification => {
        notification.isDeleted = false;
      });
    });
  }

  add(request) {
    this.selectedRequest = request;
    this.userService.getUser(request.requester).subscribe(response => {
      this.requester = response;
    })
  }

  remove(request) {
    this.selectedRequest = null;
    request.isDeleted = true;
  }

  undo(request) {
    request.isDeleted = false;
  }

  donate() {

  }
}