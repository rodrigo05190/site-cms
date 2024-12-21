import { ConjuntoService } from './../../service/conjunto.service';
import { Component, OnInit, Input } from '@angular/core';
import { Planta } from 'src/app/model/API/Planta';

@Component({
  selector: 'app-planta-grid',
  templateUrl: './planta-grid.component.html',
  styleUrls: ['./planta-grid.component.css']
})
export class PlantaGridComponent implements OnInit {

  constructor(
    private conjuntoService: ConjuntoService
  ) { }

  @Input() conjuntoId: number;
  @Input() produtoId: number;
  plantas: Planta[] = [];

  ngOnInit(): void {
    this.conjuntoService.getPlantas(this.conjuntoId).subscribe(sucesso => {
      this.plantas = sucesso;
    });
  }

}
