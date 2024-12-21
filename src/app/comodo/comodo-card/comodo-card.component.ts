import { PlantaComodoService } from './../../service/plantaComodo.service';
import { PlantaComodo } from './../../model/API/PlantaComodo';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-comodo-card',
  templateUrl: './comodo-card.component.html',
  styleUrls: ['./comodo-card.component.css']
})
export class ComodoCardComponent implements OnInit {

  constructor(
    private plantaComodoService: PlantaComodoService
  ) { }

  @Output() excluido = new EventEmitter<PlantaComodo>();
  @Input() plantaComodo: PlantaComodo;

  ngOnInit(): void {
  }

  excluir() {

    this.plantaComodoService.delete(this.plantaComodo).subscribe(sucesso => {
      this.excluido.emit(this.plantaComodo);
    });
  }

}
