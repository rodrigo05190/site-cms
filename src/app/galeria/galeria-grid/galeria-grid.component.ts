import { GaleriaProduto } from './../../model/API/GaleriaProduto';
import { GaleriaTipoService } from './../../service/galeriaTipo.service';
import { GaleriaTipo } from './../../model/API/GaleriaTipo';
import { GaleriaService } from './../../service/galeria.service';
import { GaleriaProdutoService } from './../../service/galeriaProduto.service';
import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Galeria } from 'src/app/model/API/Galeria';

@Component({
  selector: 'app-galeria-grid',
  templateUrl: './galeria-grid.component.html',
  styleUrls: ['./galeria-grid.component.css']
})
export class GaleriaGridComponent implements OnInit {

  constructor(
    private galeriaProdutoService: GaleriaProdutoService,
    private galeriaService: GaleriaService,
    private galeriaTipoService: GaleriaTipoService,
  ) { }
  @Input() produtoId: number;

  galerias: Galeria[] = [];
  @HostBinding('class') classes = 'br5';
  galeriaSelecionada?: Galeria = null;
  galeriaSelecionadaIndex: number = null;
  telanovo = false;

  ngOnInit(): void {
    this.getGaleriaProduto();
  }

  getGaleriaProduto() {
    // this.ids = [];
    this.galeriaProdutoService.getByProduto(this.produtoId).subscribe(sucesso => {
      sucesso.map(x => x.galeriaId).forEach(id => {
        if (id) {
          this.galeriaService.get(id).subscribe(g => {
            this.galeriaTipoService.get(g.tipoId).subscribe(tipo => {
              g.tipo = tipo;
              this.galerias.push(g);
            });
          });
        }
      });
      // console.log('aaa: ', this.ids);
    });
  }

  galeriaDeletada(galeriaId: number) {
    this.galerias = this.galerias.filter(x => x.id !== galeriaId);
  }

  novo(galeria: Galeria) {
    const gp: GaleriaProduto = { produtoId: this.produtoId, galeriaId: galeria.id } as GaleriaProduto;
    this.galeriaProdutoService.post(gp).subscribe(galeriaProdutoInserida => {
      this.galerias.push(galeria);
    });
  }



}
