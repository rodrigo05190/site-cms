import { GaleriaProduto } from './../../model/API/GaleriaProduto';
import { GaleriaProdutoService } from './../../service/galeriaProduto.service';
import { filter } from 'rxjs/operators';
import { GaleriaImagem } from './../../model/API/GaleriaImagem';
import { Observable } from 'rxjs';
import { ImagemService } from './../../service/imagem.service';
import { GaleriaImagemService } from './../../service/galeriaImagem.service';
import { GaleriaTipoService } from './../../service/galeriaTipo.service';
import { GaleriaTipo } from './../../model/API/GaleriaTipo';
import { GaleriaService } from './../../service/galeria.service';
import { Imagem } from './../../model/API/Imagem';
import { ativarDesativar } from 'src/app/animations';
import { Component, OnInit, HostBinding, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Galeria } from 'src/app/model/API/Galeria';
import { zip } from 'rxjs';
import { NgsgOrderChange } from 'ng-sortgrid';

@Component({
  selector: 'app-galeria-ficha',
  templateUrl: './galeria-ficha.component.html',
  styleUrls: ['./galeria-ficha.component.css'],
  animations: [ativarDesativar]
})
export class GaleriaFichaComponent implements OnInit, AfterViewInit, OnChanges {
  arquivosParaEditar = [];
  // temSelecionado = this.checkeds.filter(x => x.checked).length;
  arquivosParaEnviar: File[] = [];
  // @ViewChildren('imagem') checkeds: QueryList<ElementRef>;
  @HostBinding('class') classes = 'br5 ma8 borda-cinza';
  @Output() fechar = new EventEmitter();
  imagensDeletar: number[] = [];
  items: Imagem[] = [];

  galeriaImagem: GaleriaImagem[] = [];
  @Output() galeriaDeletada = new EventEmitter<number>();
  @Output() galeriaChange = new EventEmitter<Galeria>();
  status = '';

  _galeria: Galeria;
  @Input() get galeria() {
    return this._galeria;
  }
  set galeria(v: Galeria) {
    this._galeria = v;
    this.galeriaChange.emit(this._galeria);
  }


  @Input() produtoId: number;
  // teste = this.checkeds?.filter(x => x.nativeElement.checked);
  @Output() salvo = new EventEmitter<Galeria>();
  telaeditar = false;
  tipos: GaleriaTipo[];

  constructor(
    private galeriaService: GaleriaService,
    private galeriaTipoService: GaleriaTipoService,
    private galeriaImagemService: GaleriaImagemService,
    private imagemService: ImagemService,
    private galeriaProdutoService: GaleriaProdutoService
  ) { }

  edicaoFinalizada(arquivos: File[]) {
    console.log('Edição Finalizada: ', arquivos);
    arquivos.forEach(arquivo => {
      this.arquivosParaEnviar.push(arquivo);
    });
  }

  editar() {
    this.telaeditar = true;
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  // algumChecado = document.get
  ngOnInit(): void {
    this.items = [];
    this.status = 'carregando';
    if (this.galeria) {
      this.galeriaTipoService.getAll().subscribe(tipo => {
        this.tipos = tipo;
        this.galeria.tipo = tipo.filter(x => x.id === this.galeria.tipoId)[0];
      });

      this.galeriaService.getGaleriaImagem(this.galeria.id).subscribe(galeriaimagem => {
        this.galeriaImagem = galeriaimagem.sort((a, b) => a.ordem - b.ordem);
        const imagens$: Observable<Imagem>[] = [];
        this.galeriaImagem.forEach(gi => {
          imagens$.push(this.imagemService.get(gi.imagemId));
        });


        // AGUARDA A REQUISIÇÃO DE TODAS IMAGENS FINALIZAREM E AS ADICIONA NO ARRAY;
        zip(...imagens$).subscribe(x => {
          console.log('IMAGENS: ', x);
          this.items = x.sort((a, b) => {
            const gia = this.galeriaImagem?.filter(o => o.imagemId === a.id)[0]?.ordem ?? 0;
            const gib = this.galeriaImagem?.filter(o => o.imagemId === b.id)[0]?.ordem ?? 0;
            return gia - gib;
          });
          if (this.items.length > 0) {
            this.status = '';
          } else {
            this.status = 'vazio';
          }
        });

        if (imagens$.length === 0) {
          this.status = 'vazio';
        }

      });
    }
  }

  ordenar(evento: NgsgOrderChange<any>) {
    this.items = evento.currentOrder;
    console.log(this.items);
    this.items.forEach((item, index) => {
      item.ordem = index;
      const giAtualizado = this.galeriaImagem.filter(x => x.imagemId === item.id)[0];
      giAtualizado.ordem = index;
      this.galeriaImagemService.put(giAtualizado).subscribe();
    });
  }

  deletarGaleria() {
    if (confirm('Deseja realmente deletar a galeria ' + this.galeria.titulo + '? \n Essa ação não pode ser desfeita. ')) {
      const gp = { galeriaId: this.galeria.id, produtoId: this.produtoId } as GaleriaProduto;
      this.galeriaDeletada.emit(this.galeria.id);
      this.galeriaProdutoService.delete(gp).subscribe(sucesso => {
      });
    }
  }

  deletarMultiplas() {
    if (confirm('Deseja deletar ' + this.imagensDeletar.length + ' selecionada(s) da galeria ' + this.galeria.titulo)) {
      this.imagensDeletar.forEach(id => {
        this.deletar(id);
      });
    }
  }

  uploadFinalizado(imagem: Imagem, imagemParaEnviar: File) {
    this.arquivosParaEnviar = this.arquivosParaEnviar.filter(x => x.name !== imagemParaEnviar.name && x.size !== imagemParaEnviar.size);
    const galeriaImagem: GaleriaImagem = { imagemId: imagem.id, galeriaId: this.galeria.id } as GaleriaImagem;
    this.galeriaImagemService.post(galeriaImagem).subscribe(sucesso => {
      this.galeriaImagem.push(sucesso);
      this.items.push(imagem);
      // console.log('EVVV IMAGEM', imagem);
      if (this.items.length > 0) {
        this.status = '';
      }
    });
  }

  deletar(imagemId: number) {
    this.items = this.items.filter(x => x.id !== imagemId);
    this.imagensDeletar = this.imagensDeletar.filter(id => id !== imagemId);
    const galeriaImagem: GaleriaImagem = { imagemId, galeriaId: this.galeria.id } as GaleriaImagem;
    this.galeriaImagemService.delete(galeriaImagem).subscribe(sucesso => {
    });
    if (this.imagensDeletar.length == 0) {
      this.status = 'vazio';
    }
  }
}
