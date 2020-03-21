import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import { IgEgAppState } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[];
  subscriptionItems: Subscription;

  constructor( private store: Store<IgEgAppState>, private ingresoEgresoServce: IngresoEgresoService ) { }

  ngOnInit() {
    this.subscriptionItems = this.store.select('igrensoEgreso')
                                       .subscribe( ingEgr => this.items = ingEgr.items );
    console.log('items store', this.items);
  }

  borrarItem( item: IngresoEgreso ) {
    this.ingresoEgresoServce.borrarIngresoEgreso( item.uid )
                            .then( res => Swal.fire('Item Eliminado', `${item.description}`, 'success' ) )
                            .catch( err => console.error(err));
  }

  ngOnDestroy() {
    this.subscriptionItems.unsubscribe();
  }

}
