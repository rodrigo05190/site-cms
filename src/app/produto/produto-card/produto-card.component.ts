import { Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ativarDesativar } from 'src/app/animations';
import { ProdutosRelacionadosService } from 'src/app/service/produtosRelacionados.service';
import { environment } from 'src/environments/environment';
import { ProdutoCard } from './../../model/API/ProdutoCard';

@Component({
  selector: 'app-produto-card',
  templateUrl: './produto-card.component.html',
  styleUrls: ['./produto-card.component.css'],
  animations: [ativarDesativar]
})
export class ProdutoCardComponent implements OnInit, OnChanges {

  constructor(private produtosRelacionadosService: ProdutosRelacionadosService, private er: ElementRef<HTMLElement>) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.modo){
      this.er.nativeElement.classList.remove(changes.modo.previousValue);
      this.er.nativeElement.classList.add(changes.modo.currentValue);
    }
  }

  @HostBinding('class') classes = 'ma8 br5 card';

  @Input() produto: ProdutoCard;

  @Input() excluir;

  @Input() modo: 'card-compacto'|'card'|'linha'  = 'card';

  @Input() acao:"remover"|"editar" = "editar";

  environment = environment;

  @Output() removido = new EventEmitter<number>();

  ngOnInit(): void {

  }



}
