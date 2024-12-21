import { filter, tap, switchMap, map, shareReplay } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { interval, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repository } from '../model/Repository';
import { InscricaoParaNotificacao } from '../model/API/InscricaoParaNotificacao';

@Injectable({
  providedIn: 'root'
})
export class InscricaoParaNotificacaoService extends Repository<InscricaoParaNotificacao> {

  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_PRODUTO);
  }

}
