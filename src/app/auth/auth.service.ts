import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// AngularFireAuth
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

// Interface Firebase
import * as firebase from 'firebase';

// SweetAlert2
import Swal from 'sweetalert2';

// RxJs
import { map } from 'rxjs/operators';

// User Model
import { User } from './user.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { ActivarLoadingActions, DesactivarLoadingActions } from '../shared/actions/ui.actions';
import { SetUserAction, UnSetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private UserSubscription: Subscription = new Subscription();
  private user: User;

  constructor( 
                private  afAuth: AngularFireAuth,
                private  router: Router,
                private angularFireStore: AngularFirestore,
                private store: Store<AppState>,
                
           ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( ( fbUser: firebase.User ) => {
      if (fbUser) {

        this.UserSubscription =  this.angularFireStore.doc(`${ fbUser.uid }/usuario`).valueChanges()
                                                      .subscribe( userObj => {
                                                        const user: User = new User( userObj );
                                                        const action: SetUserAction = new SetUserAction( user );
                                                        this.store.dispatch( action )
                                                        this.user = user;
                                                      })
      } else {
        this.user = null;
        this.UserSubscription.unsubscribe();
      }
     
    });
  }

  crearteUser( nombre, email, password ) {

    const action: ActivarLoadingActions = new ActivarLoadingActions();
    this.store.dispatch( action );

    this.afAuth.auth.createUserWithEmailAndPassword( email, password )
        .then( res => {

          const user: User = {
            uid: res.user.uid,
            nombre: nombre,
            email: email
          }

          this.angularFireStore.doc(`${ user.uid }/usuario`)
                               .set(user)
                               .then( () => {
                                  const action: DesactivarLoadingActions = new DesactivarLoadingActions();
                                  this.store.dispatch( action );
                                  this.router.navigate(['/'])
                               });
        })
        .catch( error => {
          const action: DesactivarLoadingActions = new DesactivarLoadingActions();
          this.store.dispatch( action );
          Swal.fire('Error en el registro', error.message, 'error');
          console.error(error);
        })
  }

  loginUser( email, password ) {

    const action: ActivarLoadingActions = new ActivarLoadingActions();
    this.store.dispatch( action );

    this.afAuth.auth.signInWithEmailAndPassword( email, password )
        .then( user => {
          const action: DesactivarLoadingActions = new DesactivarLoadingActions();
          this.store.dispatch( action );
          this.router.navigate(['/']);
        })
        .catch( error => {
          const action: DesactivarLoadingActions = new DesactivarLoadingActions();
          this.store.dispatch( action );
          Swal.fire('Error en el login', error.message, 'error');
          console.error(error);
        })
  }

  logaut() {
    const action: UnSetUserAction = new UnSetUserAction();
    this.store.dispatch( action );
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState
               .pipe(
                 map( ( fbUser: firebase.User ) => {

                    if( fbUser == null ) {
                      this.router.navigate(['/login']);
                      return false;
                    }

                    return true;
                })
               )
  }

  getUser() {
    return { ...this.user };
  }
}
