import { MenuService } from './service/menu.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Location, ViewportScroller } from '@angular/common';
import { Router, NavigationEnd, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ativarDesativar, animacaoRota } from './animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ativarDesativar, animacaoRota]
})
export class AppComponent {
  title = 'Trisul CMS';

  rotasNaoMostrarBotaoVoltar = ['/login', '/dashboard'];

  @ViewChild('saidaRota') saidaRota: ElementRef;

  mostrarBotaoVoltar = true;

  constructor(
    public menuService: MenuService,
    public location: Location,
    public router: Router
  ) {

    router.events
      .pipe(
        filter(evento => evento instanceof NavigationEnd)
      ).subscribe((sucesso: NavigationEnd) => {
        console.log(sucesso.url, sucesso.urlAfterRedirects);
        // console.log(this.saidaRota);
        if (this.saidaRota?.nativeElement) {
          (this.saidaRota.nativeElement as HTMLElement).scroll({ top: 0 });
        }
        this.menuService.loading = false;
        if (this.rotasNaoMostrarBotaoVoltar.some(x => x === sucesso.urlAfterRedirects.split('?')[0])) {
          this.mostrarBotaoVoltar = false;
        } else {
          this.mostrarBotaoVoltar = true;
        }
      });

  }



  voltar() {
    this.location.back();
  }


}
