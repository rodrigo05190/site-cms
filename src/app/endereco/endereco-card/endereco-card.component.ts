import { zip } from 'rxjs';
import { Cidade } from './../../model/API/Cidade';
import { Pais } from './../../model/API/Pais';
import { CidadeService } from './../../service/cidade.service';
import { EstadoService } from './../../service/estado.service';
import { BairroService } from './../../service/bairro.service';
import { PaisService } from './../../service/pais.service';
import { EnderecoService } from './../../service/endereco.service';
import { Estado } from './../../model/API/Estado';
import { Endereco } from './../../model/API/Endereco';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Bairro } from 'src/app/model/API/Bairro';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-endereco-card',
  templateUrl: './endereco-card.component.html',
  styleUrls: ['./endereco-card.component.css']
})
export class EnderecoCardComponent implements OnInit {

  constructor(
    private enderecoService: EnderecoService,
    private paisService: PaisService,
    private bairroService: BairroService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService
  ) { }


  @Input() enderecoId: number;

  endereco: Endereco = {} as Endereco;
  estados: Estado[] = [];
  bairros: Bairro[] = [];
  paises: Pais[] = [];
  cidades: Cidade[] = [];

  estadoSelecionado: Estado = null;
  bairroSelecionado: Bairro = null;
  cidadeSelecionado: Cidade = null;
  paisSelecionado: Pais = null;

  @Output() salvo = new EventEmitter<number | null>();


  ngOnInit(): void {
    this.enderecoService.get(this.enderecoId).subscribe(
      sucesso => {
        this.endereco = sucesso;
      }
    ).add(() => {
      zip(
        this.bairroService.getAll(),
        this.cidadeService.getAll(),
        this.estadoService.getAll(),
        this.paisService.getAll(),
      ).subscribe(sucessoB => {
        this.bairros = sucessoB[0].sort((a, b) => a.nome.localeCompare(b.nome));
        this.cidades = sucessoB[1].sort((a, b) => a.nome.localeCompare(b.nome));
        this.estados = sucessoB[2].sort((a, b) => a.nome.localeCompare(b.nome));
        this.paises = sucessoB[3].sort((a, b) => a.nome.localeCompare(b.nome));
        this.selecionarBairro(this.endereco.bairroId);
      });
    });

  }

  selecionarBairro(BairroId: number) {
    if (BairroId) {
      this.bairroSelecionado = this.bairros.filter(x => x.id === BairroId)[0];
      this.selecionarCidade(this.bairroSelecionado?.cidadeId);
    }
  }

  selecionarCidade(CidadeId: number) {
    // alert(CidadeId);
    if (CidadeId) {
      this.cidadeSelecionado = this.cidades.filter(x => x.id === CidadeId)[0];
      this.selecionarEstado(this.cidadeSelecionado?.estadoId);
    }
  }

  selecionarEstado(EstadoId: number) {
    if (EstadoId) {
      this.estadoSelecionado = this.estados.filter(x => x.id === EstadoId)[0];
      this.selecionarPais(this.estadoSelecionado?.paisId);
    }
  }

  selecionarPais(PaisId: number) {
    if (PaisId) {
      this.paisSelecionado = this.paises.filter(x => x.id === PaisId)[0];
    }
  }

  bairrosFiltrados() {
    if (this.cidadeSelecionado) {
      return this.bairros.filter(x => x.cidadeId === this.cidadeSelecionado.id);
    }
    return this.bairros;
  }

  cidadesFiltrados() {
    if (this.estadoSelecionado) {
      return this.cidades.filter(x => x.estadoId === this.estadoSelecionado.id);
    }
    return this.cidades;
  }

  estadosFiltrados() {
    if (this.paisSelecionado) {
      return this.estados.filter(x => x.paisId === this.paisSelecionado.id);
    }
    return this.estados;
  }

  paisesFiltrados() {
    return this.paises;
  }

  salvar() {
    this.endereco.bairroId = this.bairroSelecionado?.id;
    if (this.endereco?.id) {
      this.enderecoService.put(this.endereco).subscribe(sucesso => this.endereco = sucesso)
        .add(() => { this.salvo.emit(this.endereco.id); });
    } else {
      this.enderecoService.post(this.endereco).subscribe(sucesso => this.endereco = sucesso)
        .add(() => { this.salvo.emit(this.endereco.id); });
    }
  }

  excluir() {
    if (this.endereco.id) {
      this.enderecoService.delete(this.endereco).subscribe(sucesso => {
        this.endereco = {} as Endereco;
        this.salvo.emit(null);
      });
    }
  }

}
