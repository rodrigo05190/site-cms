import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/model/API/Produto';
import { ProdutoCard } from 'src/app/model/API/ProdutoCard';
import { ProdutoPromocao } from 'src/app/model/API/ProdutoPromocao';
import { ProdutosRelacionados } from 'src/app/model/API/ProdutosRelacionados';
import { Promocao } from 'src/app/model/API/Promocao';
import { ProdutoPromocaoService } from 'src/app/service/produtoPromocao.service';
import { ProdutosRelacionadosService } from 'src/app/service/produtosRelacionados.service';
import { PromocaoService } from 'src/app/service/promocao.service';
import { Redirect } from './../../model/API/Redirect';
import { ConfiguracaoInterfaceProdutoService } from './../../service/configuracao-interface-produto.service';
import { EnderecoService } from './../../service/endereco.service';
import { CorretorService } from './../../service/corretor.service';
import { ProdutoService } from './../../service/produto.service';
import { RedirectService } from './../../service/redirect.service';
import { StatusVendaService } from './../../service/statusVenda.service';


@Component({
  selector: 'app-produto-ficha',
  templateUrl: './produto-ficha.component.html',
  styleUrls: ['./produto-ficha.component.css']
})
export class ProdutoFichaComponent implements OnInit {
  @HostBinding('class') public classes = 'pagina ';
  public editar = false;
  public produto: Produto = {} as Produto;
  public produtoSimilaSelecionado: Produto = {} as Produto;
  public promocaoSelecionada: Promocao = {} as Promocao;
  public similares: ProdutoCard[] = [];
  public promocoes: Promocao[] = [];
  novo = false;
  janelaSimilar = false;
  janelaPromocoes = false;
  carregandoSimilar = false;
  carregandoPromocoes = false;
  produtosSimilares: Produto[] = [];
  linkProduto = '';

  public promocao = [];

  constructor(
    public statusVendaService: StatusVendaService,
    private produtoService: ProdutoService,
    private produtosRelacionadosService: ProdutosRelacionadosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private promocaoService: PromocaoService,
    private produtoPromocaoService: ProdutoPromocaoService,
    private enderecoService: EnderecoService,
    private corretorService: CorretorService,
    private redirectService: RedirectService,
    private configuracaoInterfaceProdutoService: ConfiguracaoInterfaceProdutoService
  ) { }

  public a(evento) {
    console.log(evento);
    // this.similares = evento.currentOrder;
  }

  public ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    const id = params.produtoId;

    if (id != null) {

      this.produtoService.get(id).subscribe(sucesso => {

        this.produtoService.getLink(id).subscribe(link => this.linkProduto = link);
        let promocoesRemover: number[];
        this.produtoService.getPromocoes(id).subscribe(promocao => {
          promocoesRemover = promocao.map(x => x.promocaoId);
          promocao.filter(item => {
            this.promocaoService.get(item.promocaoId).subscribe(p => {
              this.promocao.push(p);
            });
          });

          this.produto = sucesso;
          this.listaSimilares();

          this.promocaoService.getAll().subscribe(sucesso2 => {
            // console.log(sucesso2.some(x => promocoesRemover.includes(x.id)));
            console.log(sucesso2);
            console.log(promocoesRemover);
            this.promocoes = sucesso2;
          });
        });


        this.produtosRelacionadosService.getById(sucesso.id).subscribe(produtosRelacionados => {
          produtosRelacionados.forEach(element => {
            this.produtoService.getCardUnico(element.produtoRelacionadoId).subscribe(cards => {
              this.similares.push(cards);
            });
          });

        });

      });
    } else {
      this.produto = {} as Produto;
      this.novo = true;
    }



  }

  listaSimilares() {
    if (this.produto) {

      this.produtoService.getAll().subscribe(sucesso => { this.produtosSimilares = sucesso });

      this.produtosSimilares = this.produtosSimilares.filter(x => x.id != this.produto.id);
    }
  }



  salvar() {

    // console.log(f.value);
    if (this.produto.id) {
      // this.produtoService.getLink(this.produto.id).subscribe(linkAntigo => {
      const linkAntigo = this.linkProduto;
      this.produtoService.put(this.produto).subscribe(sucesso => {
        this.produto = sucesso;
        this.produtoService.getLink(this.produto.id).subscribe(linkAtual => {
          if (linkAntigo && linkAtual && linkAntigo != linkAtual) {
            if (confirm('As alterações afetaram o LINK desse produto.\n\nDeseja criar um redirecionamento do link antigo para o novo link?')) {
              const redirect = {
                origem: linkAntigo,
                destino: linkAtual
              } as Redirect;
              this.redirectService.post(redirect).subscribe(sc => {
                this.linkProduto = linkAtual;
                alert('Um Redirect foi criado do LINK:\n' + linkAntigo + '\npara:\n' + linkAtual);
              });
            }
          } else {
            this.linkProduto = linkAtual;
          }
        });

      });
      // });
    } else {
      this.produtoService.post(this.produto).subscribe(sucesso => {
        this.produto = sucesso;
        this.produto.relevancia = -1;
        this.configuracaoInterfaceProdutoService.post({ produtoId: this.produto.id } as any).subscribe();
        this.router.navigateByUrl('/produto');
      });
    }
  }

  ativarToggle() {
    this.produto.ativo = !this.produto.ativo;
    if (!this.produto.ativo) {
      alert('Desativar um produto moverá sua posição de relevância para a ultima posição na lista.')
      this.produto.relevancia = 9999;
    }
    if (this.produto.ativo) {
      alert('Re-ativar um produto moverá sua posição de relevância para a primeira posição na lista.')
      this.produto.relevancia = -1;
    }

    this.produtoService.put(this.produto).subscribe(sucesso => {
      this.produto = sucesso;
    });
  }

  adicionarSimilar() {
    let novoProdutoSimilar: ProdutosRelacionados =
      { produtoId: this.produto.id, produtoRelacionadoId: this.produtoSimilaSelecionado.id } as ProdutosRelacionados;
    this.produtosRelacionadosService.post(novoProdutoSimilar).subscribe(sucesso => {
      this.produtoService.getCardUnico(sucesso.produtoRelacionadoId).subscribe(sucesso2 => {
        this.similares.push(sucesso2);
        this.janelaSimilar = false;
      });
    });
  }

  removerSimilar(id: number) {
    this.produtosRelacionadosService.getById(this.produto.id).subscribe(sucesso => {
      let remover = sucesso.find(x => x.produtoRelacionadoId == id);
      this.produtosRelacionadosService.delete(remover).subscribe(sucesso2 => {
        this.similares = this.similares.filter(x => x.id != id);
      })
    })
  }

  novoProdutoPromocao() {
    let novoProdutoPromocao: ProdutoPromocao = { produtoId: this.produto.id, promocaoId: this.promocaoSelecionada.id } as ProdutoPromocao;
    this.produtoPromocaoService.post(novoProdutoPromocao).subscribe(sucesso => {
      this.promocaoService.get(this.promocaoSelecionada.id).subscribe(sucesso2 => {
        this.promocao.push(sucesso2);
        this.promocoes = this.promocoes.filter(x => x.id != this.promocaoSelecionada.id)
        this.janelaPromocoes = false;
      });
    });
  }

  removerPromocao(idPromocao: number) {
    this.produtoPromocaoService.getByProduto(this.produto.id).subscribe(produtoPromocoes => {
      let produtoProcomao = produtoPromocoes.find(x => x.promocaoId == idPromocao);
      this.produtoPromocaoService.delete(produtoProcomao).subscribe(sucesso => {
        this.promocao = this.promocao.filter(x => x.id != idPromocao);
        this.promocaoService.get(idPromocao).subscribe(promo => {
          this.promocoes.push(promo);
        })

      })
    })
  }

}
