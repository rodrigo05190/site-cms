import { PlantaService } from './planta.service';
import { ConjuntoPlantaService } from './conjunto-planta.service';
import { ConjuntoPlanta } from './../model/API/ConjuntoPlanta';
import { filter, tap, switchMap, map, shareReplay } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { interval, of, throwError, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repository } from '../model/Repository';
import { Conjunto } from '../model/API/Conjunto';
import { Planta } from '../model/API/Planta';

@Injectable({
  providedIn: 'root'
})
export class ConjuntoService extends Repository<Conjunto> {


  constructor(
    private http: HttpClient,
    private plantaService: PlantaService
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_CONJUNTO);
  }

  getByProduto(idProduto: number) {
    return this.http.get<Conjunto[]>(environment.API_ROOT + environment.API_PATH_PRODUTO + idProduto + '/' + environment.API_PATH_CONJUNTO);
  }

  getPlantas(conjuntoId: number) {
    return this.http.get<ConjuntoPlanta[]>(
      environment.API_ROOT + environment.API_PATH_CONJUNTO + conjuntoId + '/' + environment.API_PATH_CONJUNTOPLANTA)
      .pipe(
        switchMap(conjuntoPlanta => {
          if (conjuntoPlanta.length) {
            return zip(...conjuntoPlanta.map(cp => this.plantaService.get(cp.plantaId)));
          } else {
            return of([] as Planta[]);
          }
        }
        )
      );
  }



}
