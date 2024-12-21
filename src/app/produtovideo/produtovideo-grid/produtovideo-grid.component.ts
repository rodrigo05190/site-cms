import { ProdutoVideoService } from './../../service/produtoVideo.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { Component, Input, OnInit, AfterViewInit, Output } from '@angular/core';
import { ProdutoVideo } from 'src/app/model/API/ProdutoVideo';

@Component({
  selector: 'app-produtovideo-grid',
  templateUrl: './produtovideo-grid.component.html',
  styleUrls: ['./produtovideo-grid.component.css']
})
export class ProdutovideoGridComponent implements OnInit, AfterViewInit {

  listaVideos: ProdutoVideo[] = [];
  @Input('produtoId') produtoId: number;
  watchIdInsert = '';

  constructor(
    private produtoService: ProdutoService,
    private produtoVideoService: ProdutoVideoService
  ) { }

  atualizar() {
    if (this.produtoId) {
      // alert();
      this.produtoService.getVideos(this.produtoId).subscribe(videos => {
        this.listaVideos = videos.sort((a, b) => a.ordem - b.ordem);
      });
    }
  }

  inserir(watchIdYoutube) {
    if (this.watchIdInsert) {
      const item: ProdutoVideo = {
        produtoId: this.produtoId,
        codigoYoutube: watchIdYoutube,
        ordem: 999
      } as ProdutoVideo;

      this.produtoVideoService.post(item).subscribe(sucesso => {
        this.watchIdInsert = '';
        this.atualizar();
      });
    }
  }

  ngAfterViewInit() {
    this.atualizar();
  }

  ngOnInit(): void {
    // alert();
  }

  itemRemovido(id){
    this.listaVideos = this.listaVideos.filter(x => x.id != id);
  }

  sorted(evento: { previusOrder: [], currentOrder: [] }) {
    this.listaVideos = evento.currentOrder;
    this.listaVideos.forEach((item, index) => {
      item.ordem = index;
      this.produtoVideoService.put(item).subscribe();
    });
  }
}
