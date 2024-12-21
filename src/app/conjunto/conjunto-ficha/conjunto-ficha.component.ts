import { Location } from '@angular/common';
import { StatusObraService } from './../../service/statusObra.service';
import { StatusObra } from './../../model/API/StatusObra';
import { StatusConjunto } from './../../model/API/StatusConjunto';
import { StatusConjuntoService } from './../../service/statusConjunto.service';
import { Component, OnInit, Host, HostBinding } from '@angular/core';
import { Conjunto } from 'src/app/model/API/Conjunto';
import { StatusVendaService } from 'src/app/service/statusVenda.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConjuntoService } from 'src/app/service/conjunto.service';
import { Produto } from 'src/app/model/API/Produto';
import { zip } from 'rxjs';

@Component({
  selector: 'app-conjunto-ficha',
  templateUrl: './conjunto-ficha.component.html',
  styleUrls: ['./conjunto-ficha.component.css']
})
export class ConjuntoFichaComponent implements OnInit {

  constructor(
    public statusVendaService: StatusVendaService,
    private conjuntoService: ConjuntoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private statusConjuntoService: StatusConjuntoService,
    private produtoService: ProdutoService,
    private statusObraService: StatusObraService,
    private location: Location
  ) { }

  @HostBinding('class') classes = 'pagina';
  conjunto: Conjunto = {} as Conjunto;
  produto: Produto = null;

  statusconjuntos: StatusConjunto[] = [];
  novo = false;
  statusObra: StatusObra = {} as StatusObra;

  janelaAdd = false;
  addMultiplo: number;
  carregandoMultipo = false;


  statusConjuntoSelecionado() {
    return this.statusconjuntos.filter(x => x.id === this.conjunto?.statusConjuntoId)[0];
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    const conjuntoId = params.conjuntoId;
    const produtoId = params.produtoId;

    if (conjuntoId) {
      this.conjuntoService.get(conjuntoId).subscribe(sucesso => {
        this.conjunto = sucesso;
      });
    } else {
      this.conjunto = {} as Conjunto;
      this.conjunto.produtoId = produtoId;
      this.novo = true;
    }

    this.produtoService.get(produtoId).subscribe(sucesso => {
      this.produto = sucesso;
      this.statusObraService.getStatusObraComTipo(this.produto.statusObraId).subscribe(sucessoB => {
        this.statusObra = sucessoB;
      });
    });

    this.statusConjuntoService.getAll().subscribe(sucesso => {
      this.statusconjuntos = sucesso;
    });

  }

  salvar() {
    if (this.conjunto.id) {
      this.conjuntoService.put(this.conjunto).subscribe(sucesso => {
        this.conjunto = sucesso;
      });
    } else {
      this.conjuntoService.post(this.conjunto).subscribe(sucesso => {
        this.conjunto = sucesso;
        this.location.back();
      });
    }
  }

  excluir() {
    this.conjuntoService.delete(this.conjunto).subscribe(sucesso => {
      this.location.back();
    });
  }

  adicionarMultiplos() {
    if (this.addMultiplo && this.addMultiplo > 0 && this.produto?.id) {
      this.carregandoMultipo = true;
      var arrRequisicoes = [];
      for (let index = 0; index < this.addMultiplo; index++) {
        arrRequisicoes.push(this.conjuntoService.post(this.conjunto));
      }

      zip(...arrRequisicoes).subscribe(sucesso => {
        this.location.back();

      })

    }
  }



}
