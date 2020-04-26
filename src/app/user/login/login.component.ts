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
    sessionStorage.setItem("loggedInUser", "");
    
    this.initialise();
  }

  login(): void {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(response => {
        this.service.loggedInUserId = response.docs[0]._id
        this.router.navigate(["./home"]);
      });
    } else {
      this.displayError = true;
    }
  }

  private initialise(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    })
  }
}