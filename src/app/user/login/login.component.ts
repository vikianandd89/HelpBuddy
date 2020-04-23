import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  displayError = false;

  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router) { }

  ngOnInit(): void {
    this.initialise();
  }

  login(): void {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(response => {
        if (response && response.id) {
          this.service.loggedInUserId = response.id
          this.router.navigate(["./home"]);
        } else {
          this.displayError = true;
        }
      });
    } else {
      this.displayError = true;
    }
  }

  private initialise(): void {
    this.loginForm = this.formBuilder.group({
      email: ["prakashalamanda@yahoo.com", [Validators.required, Validators.email]],
      password: ["testuser", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    })
  }
}