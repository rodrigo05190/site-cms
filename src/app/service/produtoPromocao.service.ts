import { filter, tap, switchMap, map, shareReplay } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { interval, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repository } from '../model/Repository';
import { ProdutoPromocao } from '../model/API/ProdutoPromocao';

@Injectable({
  providedIn: 'root'
})
export class ProdutoPromocaoService extends Repository<ProdutoPromocao> {

  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_PRODUTOPROMOCAO);
  }

  getByProduto(id:number) {
    return this.http.get<ProdutoPromocao[]>(environment.API_ROOT + environment.API_PATH_PRODUTOPROMOCAO + environment.API_PATH_PRODUTO + id);
  }

}
