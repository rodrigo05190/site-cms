import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EvolucaoObra } from '../model/API/EvolucaoObra';
import { Repository } from '../model/Repository';

@Injectable({
  providedIn: 'root'
})
export class EvolucaoObraService extends Repository<EvolucaoObra> {

  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_EVOLUCAOOBRA);
  }

}
