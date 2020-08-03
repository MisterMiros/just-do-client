import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignInRequest } from '../../objects/requests/sign-in-request';
import { BasicAuthenticationService } from '../../services/authentication/basic-authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  private error = false;
  private errorMessage = '';

  private email = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
  ])
  private password = new FormControl('', [
    Validators.required
  ])

  private formGroup = new FormGroup({
    email: this.email,
    password: this.password
  })

  constructor(
    public authenticationService: BasicAuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  submit() {
    const email = this.email.value;
    const password = this.password.value;

    const request = new SignInRequest();
    request.email = email;
    request.password = password;

    this.authenticationService.signIn(request).subscribe(
      (response) => {
        this.router.navigate(["/"]);
      },
      (response) => {
        this.error = true;
        this.errorMessage = response.message;
      }
    )
  }

}
