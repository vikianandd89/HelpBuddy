import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {

  user: any;
  registrationForm: FormGroup;
  displayError = false;

  constructor(private formBuilder: FormBuilder, private service: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initialise();
    
    var paramId = this.route.snapshot.params["id"];

    if (paramId) {
      this.service.getUser().subscribe(response => {
        this.user = response;
        this.setFormValues();
      })
    }
  }

  register(): void {
    if (this.registrationForm.valid) {
      const request = this.registrationForm.value;

      this.service.register(request).subscribe(response => {
        if (response) {
          this.router.navigate(["./home"]);
        } else {
          this.displayError = true;
        }
      });
    } else {
      this.displayError = true;
    }
  }

  update(): void {
    if (this.registrationForm.valid) {
      const request = this.registrationForm.value;

      if (this.user) {
        request._rev = this.user._rev;
        request._id = this.user._id;
        request.type = "User";
      }

      this.service.updateUser(request).subscribe(response => {
        if (response) {
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
    this.registrationForm = this.formBuilder.group({
      fullName: [this.user ? this.user.fullName : "", [Validators.required, Validators.minLength(6)]],
      email: [this.user ? this.user.email : "", [Validators.required, Validators.email]],
      password: [this.user ? this.user.password : "", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
      phone: [this.user ? this.user.phone : "", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      address: this.formBuilder.group({
        line1: [this.user ? this.user.address.line1 : "", Validators.required],
        line2: [this.user ? this.user.address.line2 : ""],
        city: [this.user ? this.user.address.city : "", Validators.required],
        postcode: [this.user ? this.user.address.postcode : "", Validators.required]
      })
    })
  }

  private setFormValues(): void {
    this.registrationForm.patchValue(this.user);
  }
}