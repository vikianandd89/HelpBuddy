import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DonationService } from '../services/donation.service';
import { UserService } from '../services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EventEmiterService } from '../services/event-emitter.service';

@Component({
  templateUrl: './donate.component.html'
})

export class DonateComponent implements OnInit {

  responses: any[];
  responder: any;

  modalRef: BsModalRef;

  private query = { "selector": { "type": "response", "isActive": true }, "execution_stats": true, "limit": 21, "skip": 0 }

  constructor(private service: DonationService, private userService: UserService, private modalService: BsModalService, private event: EventEmiterService) { }

  ngOnInit(): void {
    this.getResponse();
  }

  add(template, request) {
    this.userService.getUser(request.responder).subscribe(response => {
      this.responder = response;
      this.modalRef = this.modalService.show(template);
    })
  }

  remove(request) {
    request.isDeleted = true;
  }

  undo(request) {
    request.isDeleted = false;
  }

  closeRequest(response) {
    response.isActive = false;
    this.service.closeRequest(response).subscribe(() => {
      this.modalService.hide(1);
      this.getResponse();
    });
  }

  private getResponse(): void {
    this.service.getResponses(this.query).subscribe(response => {
      this.responses = response.filter(r => r.responder !== this.userService.loggedInUserId);
      this.event.sendResponseCount(response.length);

      return this.responses;
    });
  }
}
