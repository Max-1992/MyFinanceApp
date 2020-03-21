import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Auth Guards
import { AuthGuard } from './guards/auth.guard';

// Import Components
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';



const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'singup', component: RegisterComponent },
  { 
    path: '',
    loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module').then( m => m.IngresoEgresoModule ),
    canLoad: [ AuthGuard ]
  },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
