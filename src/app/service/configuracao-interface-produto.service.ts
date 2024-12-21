import { ConfiguracaoInterfaceProduto } from './../model/API/ConfiguracaoInterfaceProduto';
import { Injectable } from '@angular/core';
import { ComodoTipo } from '../model/API/ComodoTipo';
import { Repository } from '../model/Repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoInterfaceProdutoService extends Repository<ConfiguracaoInterfaceProduto> {

  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_CONFIGURACAOINTERFACEPRODUTO);
  }
}
