import { GaleriaTipoService } from './../../service/galeriaTipo.service';
import { GaleriaService } from './../../service/galeria.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Galeria } from 'src/app/model/API/Galeria';
import { GaleriaTipo } from 'src/app/model/API/GaleriaTipo';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-galeria-record',
  templateUrl: './galeria-record.component.html',
  styleUrls: ['./galeria-record.component.css']
})
export class GaleriaRecordComponent implements OnInit {

  @Input() galeria: Galeria = {} as Galeria;
  tipos: GaleriaTipo[] = [];

  carregando = false;

  @Output() salvo = new EventEmitter<Galeria>();
  @Output() cancelado = new EventEmitter<void>();

  constructor(
    private galeriaService: GaleriaService,
    private galeriaTipoService: GaleriaTipoService,
  ) { }

  ngOnInit(): void {
    this.galeria = { ...this.galeria };
    this.galeriaTipoService.getAll().subscribe(tipo => {
      this.tipos = tipo;
      if (this.galeria?.tipoId) {
        this.galeria.tipo = tipo.filter(x => x.id === this.galeria.tipoId)[0];
      }
    });

  }

  salvar() {
    this.carregando = true;
    if (this.galeria) {
      this.galeria.tipoId = this.galeria.tipo.id;
      // this.galeria.tipo = null;
    }
    if (this.galeria.id) {
      this.galeriaService.put(this.galeria).subscribe(sucesso => {
        this.galeria = sucesso;
        this.salvo.emit(this.galeria);
        this.carregando = false;
      });
    } else {
      this.galeriaService.post(this.galeria).subscribe(sucesso => {
        this.galeria = sucesso;
        this.salvo.emit(this.galeria);
        this.carregando = false;
      });
    }

  }
}
