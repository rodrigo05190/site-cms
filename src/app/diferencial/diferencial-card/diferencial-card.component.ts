import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { Diferencial } from 'src/app/model/API/Diferencial';
import { DiferencialProduto } from 'src/app/model/API/DiferencialProduto';
import { DiferencialProdutoService } from 'src/app/service/diferencialProduto.service';

@Component({
  selector: 'app-diferencial-card',
  templateUrl: './diferencial-card.component.html',
  styleUrls: ['./diferencial-card.component.css']
})
export class DiferencialCardComponent implements OnInit {

  constructor(private diferencialProdutoService: DiferencialProdutoService) { }

  @HostBinding('class') classes = 'br5 borda-cinza mb16 pa16';

  @Input() diferencial: Diferencial;
  @Input() diferenciaisProduto: DiferencialProduto[] = [];
  @Input() produtoId: number;
  @Output() atualizou = new EventEmitter<number>();

  diferencialProduto: DiferencialProduto = {} as DiferencialProduto;

  selecionado = false;


  ngOnInit(): void {
    this.selecionado = this.diferenciaisProduto.some(x => x.diferencialId == this.diferencial?.id)
  }


  update(): void {
    if (this.selecionado) {
      this.diferencialProduto.produtoId = this.produtoId;
      this.diferencialProduto.diferencialId = this.diferencial.id;
      this.diferencialProdutoService.post(this.diferencialProduto).subscribe(sucesso => {
        this.atualizou.emit(this.diferencial.id);
      });
    } else {
      this.diferencialProduto.produtoId = this.produtoId;
      this.diferencialProduto.diferencialId = this.diferencial.id;
      this.diferencialProdutoService.delete(this.diferencialProduto).subscribe(sucesso => {
        this.atualizou.emit(this.diferencial.id);
      });
    }

  }

}
