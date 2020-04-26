import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { DonationService } from '../services/donation.service';
import { UserService } from '../services/user.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmiterService } from '../services/event-emitter.service';


@Component({
  templateUrl: './notifications.component.html'
})

export class NotificationsComponent implements OnInit {

  notifications: any[];
  requester: any;

  modalRef: BsModalRef;
  notificationForm: FormGroup;
  displayError = false

  private query = { "selector": { "type": "request", "isActive": true }, "execution_stats": true, "limit": 21, "skip": 0 }

  constructor(private formBuilder: FormBuilder, private service: DonationService, private userService: UserService, private modalService: BsModalService, private event: EventEmiterService) { }

  ngOnInit(): void {
    this.initialise();

    this.service.getNotifications(this.query).subscribe(response => {
      this.notifications  = response.filter(r => r.requester !== this.userService.loggedInUserId);
    });
  }

  add(template, request) {
    this.userService.getUser(request.requester).subscribe(response => {
      this.requester = response;
      this.modalRef = this.modalService.show(template);
    })
  }

  remove(request) {
    request.isDeleted = true;
  }

  undo(request) {
    request.isDeleted = false;
  }

  donate(request) {
    if (this.notificationForm.valid) {
      const input = {
        "_id": "response-" + new Date().getTime(),
        "type": "response",
        "requester": request.requester,
        "responder": this.userService.loggedInUserId,
        "isActive": true,
        "quantity": this.notificationForm.value,
      };

      this.service.donate(input).subscribe(response => {
        // // this.event.sendNotificationCount(response.length);
        this.modalService.hide(1);
      });
    } else {
      this.displayError = true;
    }
  }

  private initialise(): void {
    this.notificationForm = this.formBuilder.group({
      quantity: [0, [Validators.required]]
    })
  }
}