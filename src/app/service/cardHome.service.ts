import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CardHome } from '../model/API/CardHome';
import { Repository } from '../model/Repository';


@Injectable({
  providedIn: 'root'
})
export class CardHomeService extends Repository<CardHome> {

  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_CARDHOME);
  }

}
