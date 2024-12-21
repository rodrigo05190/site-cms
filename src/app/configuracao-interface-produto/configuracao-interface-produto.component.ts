import { ConfiguracaoInterfaceProduto } from './../model/API/ConfiguracaoInterfaceProduto';
import { ConfiguracaoInterfaceProdutoService } from './../service/configuracao-interface-produto.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-configuracao-interface-produto',
  templateUrl: './configuracao-interface-produto.component.html',
  styleUrls: ['./configuracao-interface-produto.component.css']
})
export class ConfiguracaoInterfaceProdutoComponent implements OnInit {
  model: ConfiguracaoInterfaceProduto;
  @Input() produtoId: number;

  constructor(
    private configuracaoInterfaceProdutoService: ConfiguracaoInterfaceProdutoService
  ) { }

  ngOnInit(): void {
    // this.configuracaoInterfaceProdutoService.post({ produtoId: this.produtoId } as any)

    this.configuracaoInterfaceProdutoService.get(this.produtoId).subscribe(model => {
      this.model = model;
    });
  }

  salvar() {
    if (this.model?.produtoId) {
      this.configuracaoInterfaceProdutoService.put(this.model).subscribe(x => alert('Configurações de exibições atualizadas com sucesso!'));
    } else {
      this.configuracaoInterfaceProdutoService.post(this.model).subscribe(x => alert('Configurações de exibições criadas com sucesso!'));
    }
  }
}
