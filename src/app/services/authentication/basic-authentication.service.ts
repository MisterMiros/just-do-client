import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL, AUTHENTICATED_USER, TOKEN } from '../../app.constants';
import { SignInRequest } from '../../objects/requests/sign-in-request';
import { SignInResponse } from '../../objects/responses/sign-in-response';
import { SignUpRequest } from '../../objects/requests/sign-up-request';
import { SignUpResponse } from '../../objects/responses/sign-up-response';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private httpClient: HttpClient) { }

  isUserLoggedIn() {
    let user = localStorage.getItem(AUTHENTICATED_USER);
    return user !== null;
  }

  token() {
    return localStorage.getItem(TOKEN);
  }

  authenticatedUser() {
    return localStorage.getItem(AUTHENTICATED_USER);
  }

  logout() {
    localStorage.removeItem(AUTHENTICATED_USER);
    localStorage.removeItem(TOKEN);
  }

  signIn(request: SignInRequest) {
    return this.httpClient.post<SignInResponse>(`${API_URL}/auth`, request)
      .pipe(map(response => {
        localStorage.setItem(AUTHENTICATED_USER, response.email);
        localStorage.setItem(TOKEN, response.token);
        return response;
      })
      );
  }

  signUp(request: SignUpRequest) {
    return this.httpClient.post<SignUpResponse>(`${API_URL}/api/users`, request)
      .pipe(map(response => {
        localStorage.setItem(AUTHENTICATED_USER, response.email);
        localStorage.setItem(TOKEN, response.token);
        return response;
      })
      );
  }
}
