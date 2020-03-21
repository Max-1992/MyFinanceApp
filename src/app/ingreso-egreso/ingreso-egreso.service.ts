import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  subscriptIngresoEgresoListener: Subscription = new Subscription;
  subscriptIngresoEgresoItems: Subscription = new Subscription;

  constructor( 
      private angularFireStore: AngularFirestore,
      private authServices: AuthService,
      private store: Store<AppState>
    ) { }

  initIngresoEgresoListener() {
     this.subscriptIngresoEgresoListener = this.store.select('auth')
                                                    .pipe(
                                                      filter( auth => auth.user != null )
                                                    )
                                                    .subscribe( auth => this.ingresoEgresoItems( auth.user.uid ));
      
  }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {
    const user = this.authServices.getUser();
    return this.angularFireStore.doc(`${user.uid}/ingresos-egresos`)
                         .collection('items').add({ ...ingresoEgreso });
                        
  }

  private ingresoEgresoItems( uid: string ) {
    this.subscriptIngresoEgresoItems = this.angularFireStore.collection(`${ uid }/ingresos-egresos/items`)
                                                            .snapshotChanges()
                                                            .pipe(
                                                              map( docData => {
                                                                return docData.map( doc => {
                                                                  return {
                                                                    uid: doc.payload.doc.id,
                                                                    ...doc.payload.doc.data()
                                                                  };
                                                                });
                                                              })
                                                            )
                                                            .subscribe( ( collection: IngresoEgreso[] ) => {
                                                                const action: SetItemsAction = new SetItemsAction( collection );
                                                                this.store.dispatch( action );
                                                            });
  }

  cancelarSubscriptions() {
    this.subscriptIngresoEgresoItems.unsubscribe();
    this.subscriptIngresoEgresoListener.unsubscribe();
    const action: UnsetItemsAction = new UnsetItemsAction;
    this.store.dispatch( action );
  }

  borrarIngresoEgreso( uid: string ) {
    const user = this.authServices.getUser();
    return this.angularFireStore.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
                                .delete();
  }
}
