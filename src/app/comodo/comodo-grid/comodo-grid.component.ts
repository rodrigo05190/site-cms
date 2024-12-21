import { Component, Input, OnInit } from '@angular/core';
import { NgsgOrderChange } from 'ng-sortgrid';
import { ComodoTipoService } from 'src/app/service/comodoTipo.service';
import { ComodoTipo } from './../../model/API/ComodoTipo';
import { Planta } from './../../model/API/Planta';
import { PlantaComodo } from './../../model/API/PlantaComodo';
import { PlantaService } from './../../service/planta.service';
import { PlantaComodoService } from './../../service/plantaComodo.service';

@Component({
  selector: 'app-comodo-grid',
  templateUrl: './comodo-grid.component.html',
  styleUrls: ['./comodo-grid.component.css'],
})
export class ComodoGridComponent implements OnInit {
  comodo: ComodoTipo = {} as ComodoTipo;
  comodoTipo: ComodoTipo[] = [];
  planta: Planta = {} as Planta;
  plantaComodo: PlantaComodo = {} as PlantaComodo;

  plantaComodos: PlantaComodo[] = [];

  @Input() plantaId: number;

  constructor(
    public comodoTipoService: ComodoTipoService,
    private plantaService: PlantaService,
    private plantaComodoService: PlantaComodoService
  ) { }

  ngOnInit(): void {
    this.comodoTipoService.getAll().subscribe(sucesso => {
      this.comodoTipo = sucesso;
    });

    this.plantaService.getComodos(this.plantaId).subscribe(sucesso => {
      this.plantaComodos = sucesso.sort((a, b) => a.ordem - b.ordem);
    });


  }

  adicionar() {
    this.plantaComodo.plantaId = this.plantaId;
    this.plantaComodoService.post(this.plantaComodo).subscribe(sucesso => {
      sucesso.tipo = this.comodoTipo.find(x => x.id === sucesso.tipoId);
      this.plantaComodos.push(sucesso);
    });
  }

  excluir(plantaComodo: PlantaComodo) {
    this.plantaComodos = this.plantaComodos.filter(x => x.id !== plantaComodo.id);
  }

  ordenar(evento: NgsgOrderChange<any>) {
    this.plantaComodos = evento.currentOrder;
    // console.log(this.items);
    this.plantaComodos.forEach((item, index) => {
      item.ordem = index;
      this.plantaComodoService.put(item).subscribe();
    });
  }
}
