import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../../../ingreso-egreso/ingreso-egreso.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  name: string;
  subscription: Subscription;

  constructor( 
      private authService: AuthService,  
      private store: Store<AppState>,
      private IngresoEgresoService: IngresoEgresoService
     ) { }

  ngOnInit() {
    this.subscription = this.store.select('auth')
                                  .pipe(
                                    filter( auth => auth.user !== null)
                                  )
                                  .subscribe( auth => this.name = auth.user.nombre);
  }

  cerrarSesion() {
    this.authService.logaut();
    this.IngresoEgresoService.cancelarSubscriptions();
  }

  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
