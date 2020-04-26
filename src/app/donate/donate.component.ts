import { Component, OnInit } from '@angular/core';
import { DonationService } from '../services/donation.service';
import { UserService } from '../services/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  templateUrl: './donate.component.html'
})

export class DonateComponent implements OnInit {

  responses: any[];
  selectedResponse: any;
  responder: any;

  modalRef: BsModalRef;


  private query = { "selector": { "type": "response", "isActive": true }, "execution_stats": true, "limit": 21, "skip": 0 }

  constructor(private service: DonationService, private userService: UserService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.service.getDetails(this.query).subscribe(response => {
      this.responses = response;
      this.responses.forEach(notification => {
        notification.isDeleted = false;
      })
    });
  }

  add(template, request) {
    this.selectedResponse = request;
    this.userService.getUser(request.responder).subscribe(response => {
      this.responder = response;
      this.modalRef = this.modalService.show(template);
    })
  }

  remove(request) {
    this.selectedResponse = null;
    request.isDeleted = true;
  }

  undo(request) {
    request.isDeleted = false;
  }

  donate() {
    
  }
}
