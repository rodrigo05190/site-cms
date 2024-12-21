import { filter, tap, switchMap, map, shareReplay, take } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { interval, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repository } from '../model/Repository';
import { ProdutosRelacionados } from '../model/API/ProdutosRelacionados';

@Injectable({
  providedIn: 'root'
})
export class ProdutosRelacionadosService extends Repository<ProdutosRelacionados> {
  environment: any;

  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_PRODUTOSRELACIONADOS);
  }





  public getById(id: number): Observable<ProdutosRelacionados[]> {
    return this.http.get<ProdutosRelacionados[]>(environment.API_ROOT + environment.API_PATH_PRODUTOSRELACIONADOS + id).pipe(take(1), shareReplay(1));
  }

}
