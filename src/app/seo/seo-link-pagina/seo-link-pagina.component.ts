import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Seo } from 'src/app/model/API/Seo';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-seo-link-pagina',
  templateUrl: './seo-link-pagina.component.html',
  styleUrls: ['./seo-link-pagina.component.css']
})

export class SeoLinkPaginaComponent implements OnInit {
  constructor(
    private menuService: MenuService
  ) { 
  }

  abrirNovoCard:boolean = false;
  seo: Seo = {} as Seo; 

  @HostBinding('class') classes = 'pagina';

  abrirNovo(): void{
    this.abrirNovoCard = true;
  }

  fecharNovo(event){
    console.log(event);
    this.abrirNovoCard = false;
  }

  ngOnInit(): void {
  }

}

