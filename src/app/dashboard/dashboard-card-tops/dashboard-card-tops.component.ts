import { Component, OnInit, HostBinding, Host } from '@angular/core';

@Component({
  selector: 'app-dashboard-card-tops',
  templateUrl: './dashboard-card-tops.component.html',
  styleUrls: ['./dashboard-card-tops.component.css']
})
export class DashboardCardTopsComponent implements OnInit {

  constructor() { }

  @HostBinding('class') classes = '';

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
