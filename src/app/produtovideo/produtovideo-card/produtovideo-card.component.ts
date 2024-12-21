import { VideoInfo } from './../../model/VideoInfo';
import { ProdutoVideoService } from './../../service/produtoVideo.service';
import { ProdutoVideo } from './../../model/API/ProdutoVideo';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-produtovideo-card',
  templateUrl: './produtovideo-card.component.html',
  styleUrls: ['./produtovideo-card.component.css']
})
export class ProdutovideoCardComponent implements OnInit {

  constructor(
    private produtoVideoService: ProdutoVideoService
  ) { }

  @Output() itemRemovido = new EventEmitter<number>();
  @Input() video: ProdutoVideo;
  videoInfo: VideoInfo;
  erro = false;

  ngOnInit(): void {
    if (this.video?.codigoYoutube) {
      this.produtoVideoService.getInfo(this.video.codigoYoutube)
        .subscribe(
          info => {
            this.videoInfo = info;
          },
          erro => {
            this.erro = true;
          }
        );
    }
  }

  remover() {
    this.produtoVideoService.delete(this.video)
      .subscribe(removido => {
        this.itemRemovido.emit(this.video.id);
      })
  }


}
