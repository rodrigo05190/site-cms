import { StatusConjunto } from './../model/API/StatusConjunto';
import { filter, tap, switchMap, map, shareReplay } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { interval, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repository } from '../model/Repository';
import { StatusObra } from '../model/API/StatusObra';
import { StatusObraTipo } from '../model/API/StatusObraTipo';

@Injectable({
  providedIn: 'root'
})
export class StatusObraService extends Repository<StatusObra> {

  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_STATUSOBRA);
  }

  getByConjunto(idConjunto: number) {
    return this.http.get<StatusObra[]>(environment.API_ROOT + environment.API_PATH_CONJUNTO + idConjunto + '/' +
      environment.API_PATH_STATUSOBRA);
  }

  getStatusObraComTipo(statusObraId: number) {
    return this.http.get<StatusObra>(environment.API_ROOT + environment.API_PATH_STATUSOBRA + statusObraId + '/statusobratipo');
  }

}
