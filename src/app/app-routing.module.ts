import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestGuardService } from './services/routing/guest-guard.service';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { IndexComponent } from './components/index/index.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'sign-up', component: SignUpComponent, canActivate: [GuestGuardService] },

  { path: '**', redirectTo: "/" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
