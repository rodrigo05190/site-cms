import { UtilService } from 'src/app/service/util.service';
import { Component, OnInit, Input } from '@angular/core';
import { DiferencialTipoService } from 'src/app/service/diferencialTipo.service';
import { DiferencialTipo } from 'src/app/model/API/DiferencialTipo';
import { DiferencialService } from 'src/app/service/diferencial.service';
import { Diferencial } from 'src/app/model/API/Diferencial';
import { DiferencialProdutoService } from 'src/app/service/diferencialProduto.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { DiferencialProduto } from 'src/app/model/API/DiferencialProduto';
import { zip } from 'rxjs';
import { zipAll } from 'rxjs/operators';

@Component({
  selector: 'app-diferencial-ficha',
  templateUrl: './diferencial-ficha.component.html',
  styleUrls: ['./diferencial-ficha.component.css'],
})
export class DiferencialFichaComponent implements OnInit {
  constructor(private diferencialTipoService: DiferencialTipoService,
    private diferencialService: DiferencialService,
    private utilService: UtilService,
    private produtoService: ProdutoService) { }

  diferencias: Diferencial[] = [];
  diferencialNovo: Diferencial = {} as Diferencial;
  textoNovoDiferencial = "";
  tipos: DiferencialTipo[] = [];
  diferenciaisProduto: DiferencialProduto[] = [];
  tipoSelecionadoId = 1;
  textoPesquisado = "";
  carregando = true;

  @Input() produtoId: number

  ngOnInit(): void {
    zip(this.diferencialTipoService.getAll(), this.diferencialService.getAll(), this.produtoService.getDiferencial(this.produtoId)).subscribe((sucesso) => {
      if (sucesso) {
        this.tipos = sucesso[0];
        this.diferencias = sucesso[1];
        this.diferenciaisProduto = sucesso[2];
        this.carregando = false;
      }
    });
  }

  itensFiltrados() {
    return this.diferencias.filter(x => x.tipoId == this.tipoSelecionadoId)
      .filter(x => this.textoPesquisado ? this.utilService.compararNormatizado(x.texto, this.textoPesquisado) : true);
  }


  novoDiferencial() {
    this.diferencialNovo.texto = this.textoNovoDiferencial;
    this.diferencialNovo.tipoId = this.tipoSelecionadoId;

    this.diferencialService.post(this.diferencialNovo).subscribe(sucesso => {
      this.textoNovoDiferencial = "";

      this.diferencias.push(sucesso);
    })

  }

  atualizarList(atualizou) {
    console.log(this.diferenciaisProduto);
    if (this.diferenciaisProduto.some(x => x.diferencialId == atualizou)) {
      this.diferenciaisProduto = this.diferenciaisProduto.filter(x => x.diferencialId != atualizou);
    } else {
      let diferencialProduto: DiferencialProduto = {diferencialId: atualizou, produtoId: this.produtoId} as DiferencialProduto;
      this.diferenciaisProduto.push(diferencialProduto);
    }
    console.log(this.diferenciaisProduto);

  }
}
