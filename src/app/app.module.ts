import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Enviroment
import { environment } from '../environments/environment.prod';

// AuthModule
import { AuthModule } from './auth/auth.module';

// NgRx
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';

// NgRx DevTools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// AngularFire2
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthModule,
    // AngularFireAuthModule,
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
