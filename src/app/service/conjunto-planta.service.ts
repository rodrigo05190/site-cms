import { ConjuntoPlanta } from './../model/API/ConjuntoPlanta';
import { Injectable } from '@angular/core';
import { Repository } from '../model/Repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConjuntoPlantaService extends Repository<ConjuntoPlanta> {
  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_CONJUNTOPLANTA);
  }
  getByPlanta(id: number) {
    return this.http.get<ConjuntoPlanta[]>(environment.API_ROOT + environment.API_PATH_CONJUNTOPLANTA + 'planta/' + id);
  }

}
