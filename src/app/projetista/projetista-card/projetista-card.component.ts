import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { Projetista } from 'src/app/model/API/Projetista';
import { ProjetistaTipo } from 'src/app/model/API/ProjetistaTipo';
import { ProjetistaService } from 'src/app/service/projetista.service';

@Component({
  selector: 'app-projetista-card',
  templateUrl: './projetista-card.component.html',
  styleUrls: ['./projetista-card.component.css']
})
export class ProjetistaCardComponent implements OnInit {

  constructor(private projetistaService: ProjetistaService) { }

  @Input() item: Projetista;
  @Input() projetistas: Projetista[] = [];
  @Input() tipos: ProjetistaTipo[];

  @HostBinding('class') classes = 'bg-branco card ma8 br5 pa16';

  ngOnInit(): void {
    this.item.tipo = this.tipos.find(x => x.id == this.item.tipoId);
  }

  delete(): void {
    this.projetistaService.delete(this.item).subscribe(sucesso =>
      this.projetistas.splice(this.projetistas.indexOf(this.item),1)
    )
  }

}
