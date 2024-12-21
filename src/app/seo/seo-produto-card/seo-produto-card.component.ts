import { Seo } from './../../model/API/Seo';
import { Component, OnInit, Input } from '@angular/core';
import { SeoProdutoService } from 'src/app/service/seoProduto.service';
import { SeoService } from 'src/app/service/seo.service';
import { SeoProduto } from 'src/app/model/API/SeoProduto';

@Component({
  selector: 'app-seo-produto-card',
  templateUrl: './seo-produto-card.component.html',
  styleUrls: ['./seo-produto-card.component.css']
})

export class SeoProdutoCardComponent implements OnInit {

  constructor(private seoProdutoService: SeoProdutoService, private seoService: SeoService) { }

  seoProduto: SeoProduto = {} as SeoProduto;
  seoProdutoNovo: SeoProduto = {} as SeoProduto;
  seo: Seo = {} as Seo;
  jaExiste = false;

  @Input() produtoId: number;

  ngOnInit(): void {
    this.seoProdutoService.get(this.produtoId).subscribe(sucesso => {
      if (sucesso?.seoId) {
        this.seoProduto = sucesso;
        this.seoService.get(sucesso.seoId).subscribe(su => {
          this.seo = su;
          this.jaExiste = true;
        });
      }
    });
  }

  salvar(): void {
    if (this.jaExiste) {
      this.seoService.put(this.seo).subscribe(sucesso => this.seo = sucesso);
    } else {
      this.seoService.post(this.seo).subscribe(sucesso => {
        this.seo = sucesso;
        this.seoProdutoNovo.produtoId = this.produtoId;
        this.seoProdutoNovo.seoId = this.seo.id;
        this.seoProdutoService.post(this.seoProdutoNovo).subscribe(su => {
          this.seoProduto = su;
          this.jaExiste = true;
        });
      });
    }
  }


  excluir() {
    if (this.jaExiste) {
      const seoProduto: SeoProduto = {
        produtoId: this.produtoId,
        seoId: this.seo.id
      } as SeoProduto;

      this.seoProdutoService.delete(seoProduto).subscribe(sucesso => {
        this.seoProduto = null;
        this.seo = {} as Seo;
        this.jaExiste = false;
      })
    }
  }

}
