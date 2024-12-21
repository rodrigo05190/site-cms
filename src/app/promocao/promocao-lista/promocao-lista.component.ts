import { Component, OnInit, HostBinding } from '@angular/core';
import { PromocaoService } from 'src/app/service/promocao.service';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-promocao-lista',
  templateUrl: './promocao-lista.component.html',
  styleUrls: ['./promocao-lista.component.css']
})
export class PromocaoListaComponent implements OnInit {

  constructor(
    private promocaoService: PromocaoService
  ) { }

  @HostBinding('class') classes = 'pagina';

  items:[];

  loadPromocoes(): void{
    this.promocaoService.getAll().subscribe((o:[]) => {
      console.log(o);
      this.items = o;
    })

  }

  ngOnInit(): void {
    this.loadPromocoes();
  }

}
