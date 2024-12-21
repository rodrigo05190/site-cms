import { ProdutoCrm } from './../model/API/ProdutoCrm';
import { Repository } from './../model/Repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoCrmService extends Repository < ProdutoCrm > {

  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_PRODUTO_CRM);
  }


  getByProduto(produtoId) {
    return this.http.get<ProdutoCrm[]>(environment.API_ROOT + environment.API_PATH_PRODUTO_CRM + produtoId);
  }
}
