import { GaleriaImagem } from './../model/API/GaleriaImagem';
import { filter, tap, switchMap, map, shareReplay } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { interval, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repository } from '../model/Repository';
import { Galeria } from '../model/API/Galeria';
import { Imagem } from '../model/API/Imagem';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService extends Repository<Galeria> {

  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_GALERIA);
  }

  getGaleriaImagem(galeriaId) {
    return this.http.get<GaleriaImagem[]>(environment.API_ROOT + environment.API_PATH_GALERIA + galeriaId + '/galeriaimagem');
  }

}
