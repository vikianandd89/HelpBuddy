import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './user.component.html'
})

export class UserComponent implements OnInit {

  user: any;

  constructor(private service: UserService, private router: Router) { }

  ngOnInit(): void {
    this.service.getUser(this.service.loggedInUserId).subscribe(response => {
      this.user = response;
    })
  }

  navigate(): void {
    this.router.navigate(["../profile", this.service.loggedInUserId]);
  }
}
