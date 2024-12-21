import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ProjetistaService } from 'src/app/service/projetista.service';
import { ProjetistaTipoService } from 'src/app/service/projetistaTipo.service';
import { Projetista } from 'src/app/model/API/Projetista';
import { ProjetistaTipo } from 'src/app/model/API/ProjetistaTipo';
import { zip } from 'rxjs';

@Component({
  selector: 'app-projetista-ficha',
  templateUrl: './projetista-ficha.component.html',
  styleUrls: ['./projetista-ficha.component.css']
})
export class ProjetistaFichaComponent implements OnInit {

  constructor(private projetistaService: ProjetistaService, private projetistaTipoService: ProjetistaTipoService) { }

  projetistas: Projetista[] = [] as Projetista[];
  projetista: Projetista = {} as Projetista;
  projetistaTipos: ProjetistaTipo[] = [] as ProjetistaTipo[];

  @Input() produtoId: number;

  ngOnInit(): void {
    zip( this.projetistaService.getByProduto(this.produtoId) ,this.projetistaTipoService.getAll()).subscribe(sucesso => {
      if (sucesso) {
        this.projetistas = sucesso[0];
        this.projetistaTipos = sucesso[1];

      }
    })
  }

  Salvar(): void {
    this.projetista.produtoId = this.produtoId;
    this.projetistaService.post(this.projetista).subscribe(sucesso => {
      this.projetistas.push(sucesso);
      this.projetista.nome = "";
      this.projetista.tipoId = 0;
    });
  }

}
