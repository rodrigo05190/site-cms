import { Component, OnInit } from '@angular/core';
import { NgsgOrderChange } from 'ng-sortgrid';
import { zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CardHome } from './../../model/API/CardHome';
import { ProdutoCard } from './../../model/API/ProdutoCard';
import { CardHomeService } from './../../service/cardHome.service';
import { ProdutoService } from './../../service/produto.service';

@Component({
  selector: 'app-cardhome-pagina',
  templateUrl: './cardhome-pagina.component.html',
  styleUrls: ['./cardhome-pagina.component.css']
})
export class CardhomePaginaComponent implements OnInit {


  selecionadoParaInserir: ProdutoCard;
  produtoCardsHome: ProdutoCard[] = [];
  cardsHome: CardHome[] = [];
  listaTodosProdutos: ProdutoCard[] = [];

  constructor(
    private cardHomeService: CardHomeService,
    private produtoService: ProdutoService,

  ) { }

  ngOnInit(): void {
    this.produtoService.getCard().subscribe(lista => {
      this.listaTodosProdutos = lista.sort((a, b) => a.nome.localeCompare(b.nome));
    });

    this.atualizarListaProdutoCardHome();

  }

  adicionar(produto: ProdutoCard) {
    this.cardHomeService.post({ ordem: 999, produtoId: produto.id } as any).subscribe(cardHome => {
      this.cardsHome.push(cardHome);
      this.produtoService.getCardUnico(cardHome.produtoId).subscribe(produtoCard => {
        this.produtoCardsHome.push(produtoCard);
      });
    });
  }

  listaFiltrada(listaJaSelecionada: CardHome[]) {
    return this.listaTodosProdutos.filter(produto => !listaJaSelecionada.some(o => o.produtoId == produto.id));
  }

  ordenados(evento: NgsgOrderChange<ProdutoCard>) {
    const ordenados: CardHome[] =
      evento.currentOrder
        .map((produtoCard, index) => {
          const idCardHome = this.cardsHome.find(x => x.produtoId == produtoCard.id)?.id;
          return { produtoId: produtoCard.id, ordem: index, id: idCardHome } as CardHome;
        });

    ordenados.forEach(item => {
      this.cardHomeService.put(item).subscribe();
    });
  }

  remover(produtoId: number) {
    const cardHomeParaSerRemovido = this.cardsHome.find(x => x.produtoId == produtoId);
    if (cardHomeParaSerRemovido) {
      this.cardHomeService.delete(cardHomeParaSerRemovido).subscribe(x => {
        this.atualizarListaProdutoCardHome();
      });
    }
  }


  atualizarListaProdutoCardHome() {
    // this.produtoCardsHome = [];

    this.cardHomeService.getAll().pipe(switchMap(listaCardHome => {
      // console.log({ lista });
      this.cardsHome = listaCardHome;
      const requisicoes = listaCardHome.sort((a, b) => a.ordem - b.ordem).map(item =>
        this.produtoService.getCardUnico(item.produtoId)
      );

      return zip(...requisicoes);

    })
    ).subscribe(lista => {
      this.produtoCardsHome = lista;
    });
  }
}
