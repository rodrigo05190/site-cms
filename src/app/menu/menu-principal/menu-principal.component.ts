import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  constructor(
    private httpClient: HttpClient
  ) { }

  status = {} as any;

  ngOnInit(): void {
  }

  limparCache() {
    this.httpClient.get(environment.API_ROOT + 'admin/reiniciar').subscribe(sucesso => {
      alert('Todas as APIs foram reiniciadas.')
    });
  }

}
