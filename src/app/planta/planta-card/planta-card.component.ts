import { ConjuntoPlanta } from './../../model/API/ConjuntoPlanta';
import { ConjuntoService } from 'src/app/service/conjunto.service';
import { ConjuntoPlantaService } from './../../service/conjunto-planta.service';
import { environment } from './../../../environments/environment';
import { filter } from 'rxjs/operators';
import { PlantaComodo } from './../../model/API/PlantaComodo';
import { Router, ActivatedRoute } from '@angular/router';
import { PlantaService } from './../../service/planta.service';
import { Component, OnInit, HostBinding, Input, EventEmitter, Output } from '@angular/core';
import { Planta } from 'src/app/model/API/Planta';

@Component({
  selector: 'app-planta-card',
  templateUrl: './planta-card.component.html',
  styleUrls: ['./planta-card.component.css']
})
export class PlantaCardComponent implements OnInit {

  constructor(
    private plantaService: PlantaService,
    private router: ActivatedRoute,
    private conjuntoPlantaService: ConjuntoPlantaService,
    private conjuntoService: ConjuntoService
  ) { }

  environment = environment;

  @Output() removido = new EventEmitter<number>();

  shareText = '';

  @HostBinding('class') classes = 'ma8 br5 card';

  @Input() planta: Planta;
  @Input() conjuntoId: number;

  ngOnInit(): void {
    if (this.planta?.plantaComodo) {
      this.planta.plantaComodo = this.planta.plantaComodo.filter(x => x.quantidade > 0);
    }
    this.conjuntoPlantaService.getByPlanta(this.planta.id).subscribe(sucesso => {
      // RETIRA O CONJUNTO ATUAL
      sucesso = sucesso.filter(x => x.conjuntoId != this.conjuntoId);

      if (sucesso.length) {
        this.shareText = 'Compartilhada também com os conjuntos: ';
        sucesso.filter(x => x).forEach(x => {
          this.conjuntoService.get(x.conjuntoId).subscribe(c => {

            this.shareText += '\n ' + (c?.nome || 'Conjunto - (sem nome) ID - ' + c.id);
          });
        });
      }
    });
  }

  remover() {
    if (this.shareText) {
      if (confirm(
        'Essa ação apenas removerá o compartilhamento com este conjunto.\nPara excluir uma planta compartilhada, entre na ficha da planta e clique em Excluir.\n\nDeseja continuar ? ')
      ) {
        return;
      }
    } else {
      if (!confirm('Deseja deletar essa planta ? ')) {
        return;
      }
    }

    const cp = { conjuntoId: this.conjuntoId, plantaId: this.planta.id } as ConjuntoPlanta;
    this.conjuntoPlantaService.delete(cp).subscribe(sucesso => {
      this.removido.emit(this.planta.id);
    });

  }
}
