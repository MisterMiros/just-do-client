import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BasicAuthenticationService } from '../../services/authentication/basic-authentication.service';
import { Router } from '@angular/router';
import { SignUpRequest } from '../../objects/requests/sign-up-request';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  private error = false;
  private errorMessage = '';

  private email = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
  ])
  private password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    this.validatePassword
  ])
  private passwordConfirmation = new FormControl('')

  private formGroup = new FormGroup({
    email: this.email,
    password: this.password,
    passwordConfirmation: this.passwordConfirmation
  }, this.mustMatch('password', 'passwordConfirmation'));

  constructor(
    private authenticationService: BasicAuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  validatePassword(control: AbstractControl) {
    const value = control.value;
    const errors: ValidationErrors = {};

    if (/\s/m.test(value)) {
      errors.hasSpaces = true;
    }
    const lowercaseMatch = value.match(/[a-z]/g);
    if (lowercaseMatch == null || lowercaseMatch.length < 2) {
      errors.noLowercase = true;
    }
    const uppercaseMatch = value.match(/[A-Z]/g);
    if (uppercaseMatch == null || uppercaseMatch.length < 2) {
      errors.noUppercase = true;
    }
    if (!/[0-9]/.test(value)) {
      errors.noDigits = true;
    }
    if (!/[*.!@#$%^&(){}[\]:;<>,.?\/~_ +\-=|\\]/.test(value)) {
      errors.noSpecialCharacters = true;
    }

    if (Object.keys(errors).length === 0) {
      return null;
    }
    return errors;
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup): ValidationErrors | null => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (control.errors && !control.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        control.setErrors({ mustMatch: true });
      } else {
        control.setErrors(null);
      }
    }
  }

  submit() {
    const email = this.email.value;
    const password = this.password.value;

    const request = new SignUpRequest();
    request.email = email;
    request.password = password;

    this.authenticationService.signUp(request).subscribe(
      (response) => {
        this.router.navigate(["/"]);
      },
      (response) => {
        this.error = true;
        console.log(response);
        this.errorMessage = response.error.message;
      }
    )
  }

}
