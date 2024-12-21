import { PlantaComodo } from './../model/API/PlantaComodo';
import { filter, tap, switchMap, map, shareReplay } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { interval, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repository } from '../model/Repository';
import { Planta } from '../model/API/Planta';

@Injectable({
  providedIn: 'root'
})
export class PlantaService extends Repository<Planta> {

  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_PLANTA);
  }

  getByConjunto(idConjunto: number) {
    return this.http.get<Planta[]>(environment.API_ROOT + environment.API_PATH_CONJUNTO + idConjunto + '/' + environment.API_PATH_PLANTA);
  }

  getComodos(plantaId: number) {
    return this.http.get<PlantaComodo[]>(environment.API_ROOT + environment.API_PATH_PLANTA + plantaId + '/' + environment.API_PATH_COMODO);
  }

}
