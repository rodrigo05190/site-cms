import { ProdutoService } from './../../service/produto.service';
import { ConjuntoService } from './../../service/conjunto.service';
import { Component, OnInit, Input } from '@angular/core';
import { Produto } from 'src/app/model/API/Produto';
import { Conjunto } from 'src/app/model/API/Conjunto';
import { zip } from 'rxjs';

@Component({
  selector: 'app-conjunto-grid',
  templateUrl: './conjunto-grid.component.html',
  styleUrls: ['./conjunto-grid.component.css']
})
export class ConjuntoGridComponent implements OnInit {

  constructor(
    private conjuntoService: ConjuntoService,
    private produtoService: ProdutoService
  ) { }

  @Input() produto: Produto;
  conjuntos: Conjunto[] = [];
  janelaAdd = false;
  addMultiplo: number;
  carregandoMultipo = false;

  ngOnInit(): void {
    this.updateConjuntos();
  }



  updateConjuntos() {
    if (this.produto?.id) {
      this.produtoService.getConjuntos(this.produto.id).subscribe(sucesso => {
        this.conjuntos = sucesso;
      });
    }
  }
}
