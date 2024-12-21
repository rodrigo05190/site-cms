import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { environment } from './../../../environments/environment';
import { RelatorioContatoDestino } from './../../model/API/Dashboard';

@Component({
  selector: 'app-dashboard-card-quantidade-conversoes',
  templateUrl: './dashboard-card-quantidade-conversoes.component.html',
  styleUrls: ['./dashboard-card-quantidade-conversoes.component.css']
})
export class DashboardCardQuantidadeConversoesComponent implements OnInit {

  constructor(
    private http: HttpClient

  ) { }

  itens: RelatorioContatoDestino[];

  dataInicio = moment().startOf('day').format().slice(0,16);
  dataFim = moment().add(1,'minute').format().slice(0,16)

  ngOnInit(): void {
    this.obterRelatorio(this.dataInicio, this.dataFim);
  }



  obterRelatorio(dataInicio: string, dataFim: string) {
    this.itens = null;
    this.http.post<RelatorioContatoDestino[]>(environment.API_ROOT + environment.API_PATH_DASHBOARD_CONTAGEM_CONVERSOES, { dataInicio, dataFim })
      .subscribe(resultado => this.itens = resultado)
  }



}
