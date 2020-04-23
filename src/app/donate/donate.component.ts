import { Component, OnInit } from '@angular/core';
import { DonationService } from '../services/donation.service';
import { UserService } from '../services/user.service';

@Component({
  templateUrl: './donate.component.html'
})

export class DonateComponent implements OnInit {

  responses: any[];
  selectedResponse: any;
  responder: any;

  constructor(private service: DonationService, private userService: UserService) { }

  ngOnInit(): void {
    this.service.getResponse().subscribe(response => {
      this.responses = response.docs;
      this.responses.forEach(notification => {
        notification.isDeleted = false;
      })
    });
  }

  add(request) {
    this.selectedResponse = request;
    this.userService.getUser(request.responder).subscribe(response => {
      this.responder = response;
    })
  }

  remove(request) {
    this.selectedResponse = null;
    request.isDeleted = true;
  }

  undo(request) {
    request.isDeleted = false;
  }

  closeRequest(request) {
    
  }
}
