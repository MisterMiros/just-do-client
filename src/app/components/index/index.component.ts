import { Component, OnInit } from '@angular/core';
import { BasicAuthenticationService } from '../../services/authentication/basic-authentication.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private authenticationService: BasicAuthenticationService
  ) { }

  ngOnInit() {
  }

  isAuthenticated() {
    return this.authenticationService.isUserLoggedIn();
  }

}
