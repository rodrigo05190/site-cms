import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Crm } from '../model/API/crm';
import { Repository } from '../model/Repository';

@Injectable({
  providedIn: 'root'
})
export class CrmService extends Repository<Crm> {

  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_CRM);
  }

}
