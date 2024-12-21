import { environment } from 'src/environments/environment';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Token } from './../model/Token';
import { Injectable } from '@angular/core';
import { Login } from '../model/Login';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  readonly tokenKey = environment.AUTH_TOKEN_KEY;

  logar(login: Login) {
    return this.http.post(environment.API_ROOT + environment.API_PATH_LOGIN, login)
      .pipe(
        tap((token: Token) => {
          localStorage.setItem("nomeUsuario", login.Usuario);
          this.armazenarToken(token);
        },
          (error: HttpErrorResponse) => {
            this.router.navigate(['login']);
          }),

      );
  }

  obterNomeUsuario(){
    return localStorage.getItem("nomeUsuario");
  }

  private armazenarToken(token: Token) {
    if (token) {
      localStorage.setItem(this.tokenKey, JSON.stringify(token));
    }
  }

  private apagarToken() {
    localStorage.removeItem(this.tokenKey);
  }

  sair() {
    return this.apagarToken();
  }

  validarToken() {
    // O interceptor vai injetar o token nisso;
    return this.http.get(environment.API_ROOT + environment.API_PATH_VALIDAR_TOKEN)
      .pipe(map(sucesso => true), catchError(erro => of(false)));
  }

  usuarioLogado(): Observable<boolean> {
    const token = this.getToken();
    // console.log(token, !token , !token.authenticated , this.expirou(token));
    if (!token || !token.authenticated || this.expirou(token)) { return of(false); }
    return this.validarToken().pipe(tap(retorno => {console.log('token valido:', retorno)}));
  }


  expirou(token: Token) {
    return new Date(token.expiration) <= new Date();
  }

  getToken(): Token {
    const tokenString = localStorage.getItem(this.tokenKey);
    // if (!tokenString) { throw Error('Não possui token armazenado'); }
    const tokenObject = tokenString ? (JSON.parse(tokenString) as Token) : null;
    // if (!tokenObject) { throw Error('Falha ao converter token em Objeto'); }

    return tokenObject;
  }

}
