import { Redirect } from './../../model/API/Redirect';
import { RedirectService } from './../../service/redirect.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { UtilService } from 'src/app/service/util.service';
import { utils } from 'protractor';

@Component({
  selector: 'app-redirect-pagina',
  templateUrl: './redirect-pagina.component.html',
  styleUrls: ['./redirect-pagina.component.css']
})
export class RedirectPaginaComponent implements OnInit {

  constructor(
    private redirectService: RedirectService,
    private utilService: UtilService
  ) { }

  @HostBinding('class') classes = 'pagina';
  pesquisa = '';
  items: Redirect[] = [];
  novo = false;

  ngOnInit(): void {
    this.atualizar();
  }

  atualizar() {
    this.redirectService.getAll().subscribe(sucesso => {
      this.items = sucesso;
    });
  }

  lista() {
    return this.items.filter(x => this.pesquisa ? this.utilService.compararNormatizado(x.origem + x.destino, this.pesquisa) : true);
  }


}
