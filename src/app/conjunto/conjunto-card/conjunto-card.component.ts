import { ConjuntoService } from 'src/app/service/conjunto.service';
import { PlantaService } from './../../service/planta.service';
import { StatusConjuntoService } from './../../service/statusConjunto.service';
import { StatusConjunto } from './../../model/API/StatusConjunto';
import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { Conjunto } from 'src/app/model/API/Conjunto';

@Component({
  selector: 'app-conjunto-card',
  templateUrl: './conjunto-card.component.html',
  styleUrls: ['./conjunto-card.component.css']
})
export class ConjuntoCardComponent implements OnInit {

  constructor(
    public statusConjuntoService: StatusConjuntoService,
    public plantaService: PlantaService,
    private conjuntoService: ConjuntoService
  ) { }

  @HostBinding('class') classes = 'ma8 br5 card';

  @Input() conjunto: Conjunto;
  planta: number;

  @Input() public multi: Conjunto[] = null;
  @Output() public multiChange = new EventEmitter<Conjunto[]>();

  get selecionado() {
    return this.multi.some(x => x === this.conjunto);
  }

  set selecionado(v) {
    if (v) {
      this.multi.push(this.conjunto);
    } else {
      this.multi = this.multi.filter(x => x != this.conjunto);
    }
    this.multiChange.emit(this.multi);
  }

  ngOnInit(): void {
    if (this.conjunto?.id) {
      this.conjuntoService.getPlantas(this.conjunto.id).subscribe(sucesso => {
        this.planta = sucesso.length;
      });
    }
  }

}
