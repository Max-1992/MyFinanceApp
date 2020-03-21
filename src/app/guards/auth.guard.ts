import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( 
               private router: Router,
               private authService: AuthService
            ) {}

  canActivate(): Observable<boolean> {
      return this.authService.isAuth();
  }

  canLoad() {
    // Utilizamos el operador take para cancelar la suscripcion.
    return this.authService.isAuth()
                           .pipe(
                             take(1)
                           );
  }
  
}
