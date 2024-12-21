import { PlantaComodoService } from './../../service/plantaComodo.service';
import { VantagemCompraService } from './../../service/vantagemCompra.service';
import { Location } from '@angular/common';
import { tap, switchMap } from 'rxjs/operators';
import { ConjuntoPlanta } from './../../model/API/ConjuntoPlanta';
import { ConjuntoPlantaService } from './../../service/conjunto-planta.service';
import { PlantaTipoService } from './../../service/plantaTipo.service';
import { PlantaTipo } from './../../model/API/PlantaTipo';
import { environment } from './../../../environments/environment';
import { ConjuntoService } from 'src/app/service/conjunto.service';
import { ProdutoService } from './../../service/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlantaService } from './../../service/planta.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Planta } from 'src/app/model/API/Planta';
import { Conjunto } from 'src/app/model/API/Conjunto';
import { Produto } from 'src/app/model/API/Produto';
import { zip } from 'rxjs';
import { PlantaComodo } from 'src/app/model/API/PlantaComodo';
import { VantagemCompra } from 'src/app/model/API/VantagemCompra';

@Component({
  selector: 'app-planta-ficha',
  templateUrl: './planta-ficha.component.html',
  styleUrls: ['./planta-ficha.component.css']
})
export class PlantaFichaComponent implements OnInit {

  constructor(
    private plantaService: PlantaService,
    private activatedRoute: ActivatedRoute,
    private produtoService: ProdutoService,
    private conjuntoService: ConjuntoService,
    private plantaTipoService: PlantaTipoService,
    private conjuntoPlantaService: ConjuntoPlantaService,
    private router: Router,
    private location: Location,
    private vantagemCompraService: VantagemCompraService,
    private plantaComodoService: PlantaComodoService,
  ) { }

  planta: Planta = {} as Planta;
  conjunto: Conjunto;
  produto: Produto;
  tipos: PlantaTipo[] = [];
  novo = false;

  janelaShare = false;
  conjuntosSelecionadosShare: Conjunto[] = [];
  conjuntosShare: Conjunto[] = [];
  shareSend = 0;
  shareCarregando = false;
  conjuntosJaCompartilhados: Conjunto[] = [];

  environment = environment;

  plantaId;
  produtoId;
  conjuntoId;



  @HostBinding('class') classes = 'pagina';

  a(x) {
    alert(x);
  }

  ngOnInit(): void {
    const { plantaId, produtoId, conjuntoId } = this.activatedRoute.snapshot.params;

    this.plantaId = plantaId;
    this.produtoId = produtoId;
    this.conjuntoId = conjuntoId;

    if (plantaId) {
      this.plantaService.get(plantaId).subscribe(sucesso => {
        this.planta = sucesso;
      });

    } else {
      this.planta = {} as Planta;
      this.planta.conjuntoId = conjuntoId;
      this.novo = true;
    }

    this.produtoService.get(produtoId).subscribe(sucesso => {
      this.produto = sucesso;
    });
    console.log('teste');
    this.updateConjuntosShare();

    this.conjuntoService.get(conjuntoId).subscribe(sucesso => {
      this.conjunto = sucesso;
    });

    this.plantaTipoService.getAll().subscribe(sucesso => {
      this.tipos = sucesso;
    });
  }

  updateConjuntosShare() {
    this.conjuntosShare = [];

    this.produtoService.getConjuntos(this.produtoId).subscribe(sucesso => {
      sucesso
        // Exceto o conjunto atual
        .filter(x => x.id != this.conjuntoId)
        .forEach(c => {
          console.log('aaaa')
          this.conjuntoService.getPlantas(c.id).pipe(tap(sucesso => {
            console.log('O conjunto com id ' + c.id + ' nao tem a planta com id ' + this.plantaId);
          })).subscribe(plantas => {

            if (plantas.some(p => p.id == this.plantaId)) {
              // O CONJUNTO TEM A PLANTA QUE ESTA NA TELA;
              console.log('y' + c.id)
              this.conjuntosJaCompartilhados.push(c);
            } else {
              console.log('x' + c.id)
              // O CONJUNTO NÃO TEM A PLANTA QUE ESTA NA TELA;
              this.conjuntosShare.push(c);
            }
          });

        });
    });
  }

  salvar() {
    console.log(this.planta);
    this.planta.imagem = null;
    this.planta.tipo = null;
    if (this.planta.id) {
      this.planta.plantaComodo = null;
      this.plantaService.put(this.planta).subscribe(sucesso => {
        this.planta = sucesso;
      });
    } else {
      this.plantaService.post(this.planta).subscribe(sucesso => {
        this.planta = sucesso;
        const cp = { conjuntoId: this.conjuntoId, plantaId: sucesso.id } as ConjuntoPlanta;
        this.conjuntoPlantaService.post(cp).subscribe(s => {
          this.router.navigateByUrl('/produto/' + this.produtoId + '/conjunto/' + this.conjuntoId + '/planta/' + this.planta.id);
        })
      });
    }
  }

  excluir() {

    if (this.conjuntosJaCompartilhados.length) {
      // tslint:disable-next-line: max-line-length
      if (!confirm('Essa planta é compartilhada, deleta-la também resultará na exclusão de seus compartilhamentos.\n\nDeseja continuar ? ')) {
        return;
      }
    } else {
      if (!confirm('Deseja deletar essa planta ? ')) {
        return;
      }
    }

    this.plantaService.delete(this.planta).subscribe(sucesso => {
      this.location.back();
    });


  }

  copiar(conjuntos: Conjunto[]) {

    this.shareCarregando = true;
    this.plantaService.get(this.planta.id).subscribe(plantaAtual => {
      // ATUALIZA MAIS UMA VEZ A PLANTA ATUAL, PARA EVITAR INCONGRUENCIAS
      this.planta = plantaAtual;

      // PUXA AS INFORMAÇÕES VINCULADAS DE COMODOS & VANTAGEMCOMPRA
      zip(
        this.vantagemCompraService.get(this.planta.id),
        this.plantaService.getComodos(this.planta.id)
      ).pipe(switchMap(sucesso => {

        const vantagemCompraOriginal = { ...sucesso[0] };
        const plantaComodoOriginal = [...sucesso[1]];

        const requisicoes = conjuntos.map(cj => {
          // CRIA UMA COPIA DA PLANTA ATUAL PARA CADA CONJUNTO
          const plantaCopia = {
            descricao: this.planta.descricao,
            tamanho: this.planta.tamanho,
            tipoId: this.planta.tipoId,
            valor: this.planta.valor,
            linkTourVirtual: this.planta.linkTourVirtual,
          } as Planta;

          // TRANSFORMA CADA COPIA DA PLANTA EM UMA REQUISIÇÃO DE INSERÇÃO EM CADEIA com PLANTACOMODO & VANTAGEMCOMPRA
          return this.plantaService.post(plantaCopia).pipe(tap(plantaInserida => {
            const cp = { conjuntoId: cj.id, plantaId: plantaInserida.id } as ConjuntoPlanta;
            this.conjuntoPlantaService.post(cp).subscribe();

            plantaComodoOriginal.forEach(pco => {
              const plantaComodoCopia = {
                plantaId: plantaInserida.id,
                tipoId: pco.tipoId,
                quantidade: pco.quantidade,
                tamanho: pco.tamanho
              } as PlantaComodo;
              // MONTAMOS UMA COPIA COM O ID DA PLANTA QUE ACAOBU DE SER INSERIDA E JA DISPARAMOS A REQUISIÇÃO
              this.plantaComodoService.post(plantaComodoCopia).subscribe();
            });

            const vantagemCompraCopia = { ...vantagemCompraOriginal };
            // RETIRA A REFERENCIA DA PLANTA ORIGINAL, MANTENDO O RESTANTE DAS PROPRIEDADES
            vantagemCompraCopia.planta = null;
            vantagemCompraCopia.plantaId = plantaInserida.id;

            // MONTAMOS UMA COPIA E JA DISPARAMOS A REQUISIÇÃO
            this.vantagemCompraService.post(vantagemCompraCopia).subscribe();
          })).pipe(tap(x => this.shareSend++));
        });

        // EXPLODE O ARRAY DE REQUISIÇÕES EM UM ZIP QUE IRÁ DISPARAR TODAS NO SUBSCRIBE A BAIXO;
        return zip(...requisicoes);

      }))
        // EXECUTA TODAS AS REQUISIÇOES
        .subscribe(sucesso => {

          this.ngOnInit();
          this.janelaShare = false;
          this.shareCarregando = false;
        });
    });


  }

  compartilhar(conjuntos: Conjunto[]) {
    this.shareCarregando = true;
    this.shareSend = 0;

    const requisicoes = conjuntos.map(c => {
      if (!(c?.id || this.planta?.id)) { return null; }
      const cp = { conjuntoId: c.id, plantaId: this.planta.id } as ConjuntoPlanta;
      return this.conjuntoPlantaService.post(cp).pipe(tap(x => this.shareSend++));
    }).filter(x => x != null);

    zip(...requisicoes).subscribe(sucesso => {
      this.ngOnInit();
      this.janelaShare = false;
      this.shareCarregando = false;
    });
  }

}
