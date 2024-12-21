import { ImagemProdutoService } from './../../service/imagemProduto.service';
import { Component, OnInit, Input } from '@angular/core';
import { ImagemProduto } from 'src/app/model/API/ImagemProduto';

@Component({
  selector: 'app-produto-imagem-oficial-card',
  templateUrl: './produto-imagem-oficial-card.component.html',
  styleUrls: ['./produto-imagem-oficial-card.component.css']
})
export class ProdutoImagemOficialCardComponent implements OnInit {
  @Input() public produtoId: number;
  public imagemProduto: ImagemProduto;

  constructor(
    private imagemProdutoService: ImagemProdutoService
  ) { }

  public ngOnInit(): void {
    this.imagemProdutoService.get(this.produtoId).subscribe(sucesso => {
      this.imagemProduto = sucesso;
    });
  }

  update() {
    // alert();
    console.log(this.imagemProduto);
    this.imagemProdutoService.put(this.imagemProduto).subscribe();
  }
}
