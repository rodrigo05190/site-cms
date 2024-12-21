import { Redirect } from './../model/API/Redirect';
import { Injectable } from '@angular/core';
import { Repository } from '../model/Repository';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RedirectService extends Repository<Redirect> {

  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_REDIRECT);
  }

}
