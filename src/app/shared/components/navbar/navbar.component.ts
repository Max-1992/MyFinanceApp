import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  name: string;
  subscription: Subscription;

  constructor( private store: Store<AppState> ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
                                  .pipe(
                                    filter( auth => auth.user !== null)
                                  )
                                  .subscribe( auth => this.name = auth.user.nombre);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
