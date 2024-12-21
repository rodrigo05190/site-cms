import { transition, trigger, useAnimation } from '@angular/animations';
import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { fadeInLeft } from 'ng-animate';
import { NgsgOrderChange } from 'ng-sortgrid';
import { ativarDesativar, listaEmpreendimentos } from 'src/app/animations';
import { Ordem } from 'src/app/model/Ordem';
import { ProdutoCard } from './../../model/API/ProdutoCard';
import { ProdutoService } from './../../service/produto.service';

@Component({
  selector: 'app-produto-lista',
  templateUrl: './produto-lista.component.html',
  styleUrls: ['./produto-lista.component.css'],
  animations: [ativarDesativar, listaEmpreendimentos, trigger('fadeIn', [transition('* => *', useAnimation(fadeInLeft, {
    // Set the duration to 5seconds and delay to 2seconds
    params: { timing: 0.2, delay: 0 }
  }))])]
})
export class ProdutoListaComponent implements OnInit, AfterViewInit {

  constructor(
    public produtoService: ProdutoService
  ) { }

  ngAfterViewInit(): void {

  }

  pesquisa = '';
  filtroStatusEmpreendimento = null;
  filtroStatusVenda = undefined;
  exibirInativos = true;

  statusEmpreendimento = [
    { id: 1, texto: 'Futuro Lançamento' },
    { id: 2, texto: 'Breve Lançamento' },
    { id: 3, texto: 'Na Planta' },
    { id: 4, texto: 'Em Contrução' },
    { id: 5, texto: 'Pronto para morar' },
  ];

  statusVenda = [
    { id: 1, texto: 'A venda' },
    { id: 2, texto: 'Últimas Unidades' },
    { id: 3, texto: '100% Vendido' },
  ];

  @HostBinding('class') classes = 'pagina';

  items: ProdutoCard[] = [];

  modo = 'linha';

  ngOnInit(): void {

    this.produtoService.getCard().subscribe(sucesso => {
      this.items = sucesso.sort((a, b) => a.relevancia - b.relevancia);

      // Fazemos essa ordenação para que ordens negativas (-1, -2, -3, ...) e ordens de fim de lista como (9999) sejam salvas em ordem sequencial, (0,1,2,3,4,5,6, ...);
      // Quando desativamos um produto a ordem é definida como 9999;
      // Quando ativamos um produto a ordem é definida como -1;
      this.salvarOrdemAtualSendoExibida();
      // alert('ordenação exibida salva')
    });

  }

  ordenados(evento: NgsgOrderChange<ProdutoCard>) {
    const ordenados: Ordem[] =
      evento.currentOrder.map((x, index) => ({ Id: x.id, Posicao: index } as Ordem));
    this.produtoService.Ordenar(ordenados).subscribe(x => x);
  }

  salvarOrdemAtualSendoExibida() {
    console.log(this.items);
    
    const ordenados: Ordem[] =
      this.items.map((x, index) => ({ Id: x.id, Posicao: index } as Ordem));
    this.produtoService.Ordenar(ordenados).subscribe(x => x);
  }

  getStatusEmpreendimentoSelecionado(id: number) {
    return this.statusEmpreendimento.filter(x => x.id === id)[0];
  }

  getStatusVendaSelecionado(id: number) {
    return this.statusVenda.filter(x => x.id === id)[0];
  }

  listaFiltrada() {
    let filtrado = [...this.items];

    if(!this.exibirInativos){
      filtrado = filtrado.filter(x => x.ativo == true);
    }

    if (this.pesquisa) {
      filtrado = filtrado.filter(x => x.nome.toLocaleLowerCase().indexOf(this.pesquisa.toLocaleLowerCase()) > -1);
    }
    if (this.filtroStatusEmpreendimento !== null) {
      filtrado = filtrado.filter(x => x.statusConjunto?.some(c => c.id === this.filtroStatusEmpreendimento));
    }
    if (this.filtroStatusVenda != null) {
      if (this.filtroStatusVenda === 'nenhum') {
        filtrado = filtrado.filter(x => !x.statusVenda);
      } else {
        filtrado = filtrado.filter(x => x.statusVenda?.id == this.filtroStatusVenda);
      }
    }
    return filtrado;
  }

}
