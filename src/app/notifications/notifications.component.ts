import { Component, OnInit, TemplateRef } from '@angular/core';
import { DonationService } from '../services/donation.service';
import { UserService } from '../services/user.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  templateUrl: './notifications.component.html'
})

export class NotificationsComponent implements OnInit {

  notifications: any[];
  selectedRequest: any;
  requester: any;

  modalRef: BsModalRef;


  private query = { "selector": { "type": "request", "isActive": true }, "execution_stats": true, "limit": 21, "skip": 0 }

  constructor(private donation: DonationService, private userService: UserService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.donation.getDetails(this.query).subscribe(response => {
      this.notifications = response;
      this.notifications.forEach(notification => {
        notification.isDeleted = false;
      });
    });
  }

  add(template, request) {
    this.selectedRequest = request;
    this.userService.getUser(request.requester).subscribe(response => {
      this.requester = response;
      this.modalRef = this.modalService.show(template);
    })
  }

  remove(request) {
    this.selectedRequest = null;
    request.isDeleted = true;
  }

  undo(request) {
    request.isDeleted = false;
  }

  donate() { }
}