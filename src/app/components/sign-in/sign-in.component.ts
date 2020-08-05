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

  public error = false;
  public errorMessage = '';

  public email = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
  ])
  public password = new FormControl('', [
    Validators.required
  ])

  public formGroup = new FormGroup({
    email: this.email,
    password: this.password
  })

  constructor(
    private authenticationService: BasicAuthenticationService,
    private router: Router
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
