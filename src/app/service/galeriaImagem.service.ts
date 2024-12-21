import { filter, tap, switchMap, map, shareReplay } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { interval, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repository } from '../model/Repository';
import { GaleriaImagem } from '../model/API/GaleriaImagem';

@Injectable({
  providedIn: 'root'
})
export class GaleriaImagemService extends Repository<GaleriaImagem> {

  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_GALERIAIMAGEM);
  }



}
