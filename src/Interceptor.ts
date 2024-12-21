import {
  HttpErrorResponse, HttpEvent,

  HttpHandler, HttpInterceptor,

  HttpRequest,

  HttpResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from './app/service/auth.service';


@Injectable()

export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService,

  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler, ): Observable<HttpEvent<any>> {

    let dupReq = req.clone();
    console.log('METODO REQUISICAO: ', req.method);
    const token = this.authService.getToken()?.token;
    if (token && (req.url.indexOf('api.trisul') > -1 || req.url.indexOf('localhost') > -1)) {
      dupReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });

    }
    const REQUISICAOMANIPULADA = next.handle(dupReq).pipe(
      tap((requisicao: HttpResponse<any>) => {
        if (requisicao instanceof HttpResponse) {
          // console.log(requisicao.url, requisicao.status, requisicao.body);
        }
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 500 || err.status === 0) {
          const erroPersonalizado = new Error('Não foi possivel conectar ao servidor, verifique sua conexão com a internet ou tente novamente mais tarde.');
          return throwError(erroPersonalizado);
        }

        if (err.status === 401) {
          this.router.navigate(['login'], { queryParams: { irPara: this.router.routerState.snapshot.url } });
          const erroPersonalizado = new Error('Não autorizado, por favor faça login e tente novamente.');
          return throwError(erroPersonalizado);
        }

        return throwError(err.message);
      })
    );

    // if (req.method === 'GET') {
    //   // return REQUISICAOMANIPULADA.pipe(retryWhen(erros => erros.pipe(delay(5000), take(5))));
    //   return REQUISICAOMANIPULADA.pipe(retry(2));
    // }
    return REQUISICAOMANIPULADA;


  }
}


@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})


export class Interceptor { }
