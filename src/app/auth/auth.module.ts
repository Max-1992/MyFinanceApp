import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// FireModule
import { AngularFireAuthModule } from '@angular/fire/auth';

// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';




@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        AngularFireAuthModule
    ],
    exports: [],
    providers: [],
})
export class AuthModule {

 }


