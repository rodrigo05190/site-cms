import { Telefone } from './../../model/API/Telefone';
import { Component, OnInit, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-central-venda-card',
  templateUrl: './central-venda-card.component.html',
  styleUrls: ['./central-venda-card.component.css']
})
export class CentralVendaCardComponent implements OnInit {

  constructor() { }

  @HostBinding('class') classes = 'br5 ma8 borda-cinza bg-cinza-muito-claro full';

  @Input() nome = 'Ipiranga';

  telefone: Telefone = {} as Telefone;

  ngOnInit(): void {
  }

}
