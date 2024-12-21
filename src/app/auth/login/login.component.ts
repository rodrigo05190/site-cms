import { Login } from '../../model/Login';
import { AuthService } from '../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Token } from '../../model/Token';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ativarDesativar } from '../../animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [ativarDesativar]
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  login = {} as Login;
  sucesso = false;
  carregando = false;
  erro: any = null;


  ngOnInit(): void {
  }


  // logar(login) {
  //   this.router.navigate(['dashboard']);

  // }

  logar(login: Login) {
    if (login?.Usuario && login?.Senha) {
      this.carregando = true;
      this.erro = '';
      this.authService.logar(login)
        .subscribe(
          sucesso => {
            this.carregando = false;
            this.sucesso = true;
            // console.log();
            let destino = this.activatedRoute.snapshot?.queryParams?.irPara ?? 'dashboard';
            // destino = destino.
            console.log(destino);
            this.router.navigate([destino]);
          },
          (erro: Error) => {
            this.sucesso = false;
            this.carregando = false;
            this.erro = erro?.message;
          }
        );
    }
  }



}
