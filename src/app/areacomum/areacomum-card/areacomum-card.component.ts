import { AreaComumService } from './../../service/areaComum.service';
import { Imagem } from './../../model/API/Imagem';
import { ImagemService } from './../../service/imagem.service';
import { AreaComumTipoService } from './../../service/areaComumTipo.service';
import { AreaComumTipo } from './../../model/API/AreaComumTipo';
import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { AreaComum } from 'src/app/model/API/AreaComum';
import { AreaComumIcone } from 'src/app/model/API/AreaComumIcone';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-areacomum-card',
  templateUrl: './areacomum-card.component.html',
  styleUrls: ['./areacomum-card.component.css']
})
export class AreacomumCardComponent implements OnInit {

  constructor(
    private areaComumTipoService: AreaComumTipoService,
    private areaComumService: AreaComumService,
    private imagemService: ImagemService,
  ) { }

  @HostBinding('class') classes = 'ma4';
  @Input() item: AreaComum;
  @Output() deletou = new EventEmitter<number>();
  tipo: AreaComumTipo;
  icone: Imagem;

  environment = environment;

  ngOnInit(): void {
    if (this.item?.tipoId) {
      this.areaComumTipoService.get(this.item.tipoId).subscribe(sucesso => {
        this.tipo = sucesso;
      });
    }

    if (this.item?.iconeId) {
      this.imagemService.get(this.item.iconeId).subscribe(sucesso => {
        this.icone = sucesso;
      });
    }

  }

  deletar() {
    this.areaComumService.delete(this.item).subscribe(sucesso => {
      this.deletou.emit(this.item.id);
    });
  }

}
