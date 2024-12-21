import { Component, OnInit, Input } from '@angular/core';
import { ProdutoService } from '../service/produto.service';
import { Produto } from '../model/API/Produto';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {

  blogId: number;
  blogExiste = false;
  @Input() produto: Produto;


  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    if (this.produto.blogPostId) {
      this.blogExiste = true;
      this.blogId = this.produto.blogPostId
    }
  }


  salvar() {
    console.log(this.blogId);
    if (this.blogId != undefined) {

      this.produto.blogPostId = this.blogId;
      this.produtoService.put(this.produto).subscribe(sucesso => {
        this.blogExiste = true;
      })
    }

  }

  excluir() {
    this.produto.blogPostId = null;
    this.produtoService.put(this.produto).subscribe(sucesso => {
      this.blogExiste = false;
      this.blogId = null
    })
  }
}
