import { filter, tap, switchMap, map, shareReplay } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { interval, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repository } from '../model/Repository';
import { CidadeRecomendada } from '../model/API/CidadeRecomendada';

@Injectable({
  providedIn: 'root'
})
export class CidadeRecomendadaService extends Repository<CidadeRecomendada> {

  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_APP_FILTRO_CIDADERECOMENDADA);
  }

}
