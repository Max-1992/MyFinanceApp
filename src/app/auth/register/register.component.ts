import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

// NgRx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

// Rxjs
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  public user: User;
  public loading: boolean;
  private subscription: Subscription = new Subscription();

  constructor( 
      private authService: AuthService,
      private store: Store<AppState>,
    ) { 
    this.user = new User();
  }

  ngOnInit() {
    this.subscription = this.store.select('ui')
                                  .subscribe( ui => this.loading = ui.isLoading )
  }

  singUp( form: NgForm ) {

    if( form.invalid ) {
      return false;
    }

    
    this.authService.crearteUser(this.user.nombre, this.user.email, this.user.password)

    console.log(this.user);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
