import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

// NgRx
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

// Rxjs
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  public user: User;
  public loading: boolean;
  private subscription: Subscription

  constructor( 
      private authService: AuthService,
      private store: Store<AppState>
     ) {
    this.user = new User();
   }

  ngOnInit() {
   this.subscription = this.store.select('ui')
                                 .subscribe( ui => this.loading = ui.isLoading );
  }

  singIn( form: NgForm ) {

    if( form.invalid ) {
      return false;
    }

    this.authService.loginUser( this.user.email, this.user.password );
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }

}
