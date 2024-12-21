import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Conjunto } from 'src/app/model/API/Conjunto';
import { Produto } from 'src/app/model/API/Produto';
import { ConjuntoService } from 'src/app/service/conjunto.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { EvolucaoObra } from './../../model/API/EvolucaoObra';
import { EvolucaoObraService } from './../../service/evolucaoObra.service';
@Component({
  selector: 'app-statusobra-grid',
  templateUrl: './statusobra-grid.component.html',
  styleUrls: ['./statusobra-grid.component.css']
})
export class StatusobraGridComponent implements OnInit {

  constructor(
    private evolucaoObraService: EvolucaoObraService,
    private conjuntoService: ConjuntoService,
    private produtoService: ProdutoService
  ) { }

  @Input() evolucaoObraId: number | null;
  @Input() produto: Produto;
  @Input() conjunto: Conjunto;

  model: EvolucaoObra = {} as EvolucaoObra;

  @Output() novoId = new EventEmitter<number>();

  novo() {
    this.evolucaoObraService.post(this.model).subscribe(evolucaoObra => {
      this.evolucaoObraId = evolucaoObra.id;
      this.model = evolucaoObra;
      this.novoId.emit(evolucaoObra.id);
    });
  }

  excluir() {
    this.novoId.emit(null);
    this.model = {} as EvolucaoObra;

  }

  salvar() {

    if (this.evolucaoObraId) {
      this.evolucaoObraService.put(this.model).subscribe(evolucaoObra => {
        this.model = evolucaoObra;
        alert('Evolução de obra atualizada');
      });
    }

  }

  ngOnInit(): void {

    if (this.evolucaoObraId) {
      this.evolucaoObraService.get(this.evolucaoObraId).subscribe(model => {
        this.model = model;
      });
    }

  }

}
