import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-card-produtos-promocao',
  templateUrl: './dashboard-card-produtos-promocao.component.html',
  styleUrls: ['./dashboard-card-produtos-promocao.component.css']
})
export class DashboardCardProdutosPromocaoComponent implements OnInit {

  constructor() { }

  items = [
    { Nome: 'Omni Ibirapuera', Acesso: 431, Conversao: 92 },
    { Nome: 'Omni Ibirapuera', Acesso: 431, Conversao: 92 },
    { Nome: 'Omni Ibirapuera', Acesso: 431, Conversao: 92 },
    { Nome: 'Omni Ibirapuera', Acesso: 431, Conversao: 92 },
    { Nome: 'Omni Ibirapuera', Acesso: 431, Conversao: 92 },
    { Nome: 'Omni Ibirapuera', Acesso: 431, Conversao: 92 },
    { Nome: 'Omni Ibirapuera', Acesso: 431, Conversao: 92 },
    { Nome: 'Omni Ibirapuera', Acesso: 431, Conversao: 92 },
    { Nome: 'Omni Ibirapuera', Acesso: 431, Conversao: 92 },
    { Nome: 'Omni Ibirapuera', Acesso: 431, Conversao: 92 },
  ];


  ngOnInit(): void {
  }

}
