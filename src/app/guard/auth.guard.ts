import { AuthService } from './../service/auth.service';
import { Token } from './../model/Token';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.authService.usuarioLogado()
      .pipe(
        tap(retorno => {
          if (!retorno) { this.router.navigateByUrl('/login?irPara=' + state.url); }
        })
      );
  }

}
