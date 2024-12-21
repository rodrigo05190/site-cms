import { VantagemCompra } from './../../model/API/VantagemCompra';
import { VantagemCompraService } from './../../service/vantagemCompra.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-planta-vantagem-card',
  templateUrl: './planta-vantagem-card.component.html',
  styleUrls: ['./planta-vantagem-card.component.css']
})
export class PlantaVantagemCardComponent implements OnInit {

  constructor(
    private vantagemCompraService: VantagemCompraService
  ) { }

  @Input() plantaId: number;

  vantagemcompra: VantagemCompra = {} as VantagemCompra;

  ngOnInit(): void {
    this.vantagemCompraService.get(this.plantaId).subscribe(sucesso => {
      this.vantagemcompra = sucesso;
    }, erro => {
      this.vantagemcompra = {} as VantagemCompra;
    });
  }

  salvar() {
    if (!(this.vantagemcompra?.plantaId)) {
      this.vantagemcompra.plantaId = this.plantaId;
      this.vantagemCompraService.post(this.vantagemcompra).subscribe(sucesso => {
        this.vantagemcompra = sucesso;
      });
    } else {
      this.vantagemCompraService.put(this.vantagemcompra).subscribe(sucesso => {
        this.vantagemcompra = sucesso;
      });
    }
  }

}
