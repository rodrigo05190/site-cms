import { filter, tap, switchMap, map, shareReplay } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { interval, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repository } from '../model/Repository';
import { GaleriaProduto } from '../model/API/GaleriaProduto';

@Injectable({
  providedIn: 'root'
})
export class GaleriaProdutoService extends Repository<GaleriaProduto> {

  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_GALERIAPRODUTO);
  }

  getByProduto(produtoId: number) {
    return this.http.get<GaleriaProduto[]>(environment.API_ROOT + environment.API_PATH_GALERIAPRODUTO + produtoId);
  }

}
