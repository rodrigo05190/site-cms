import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-card-ultimos-cadastrados',
  templateUrl: './dashboard-card-ultimos-cadastrados.component.html',
  styleUrls: ['./dashboard-card-ultimos-cadastrados.component.css']
})
export class DashboardCardUltimosCadastradosComponent implements OnInit {

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
