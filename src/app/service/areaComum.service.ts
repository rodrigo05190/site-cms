import { filter, tap, switchMap, map, shareReplay } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { interval, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repository } from '../model/Repository';
import { AreaComum } from '../model/API/AreaComum';

@Injectable({
  providedIn: 'root'
})
export class AreaComumService extends Repository<AreaComum> {
  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_AREACOMUM);
  }

  getByProduto(produtoId) {
    return this.http.get<AreaComum[]>(environment.API_ROOT + environment.API_PATH_AREACOMUM + produtoId);
  }
}
