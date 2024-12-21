import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }


  normatizar(texto: string, replaceSpace = '') {
    if (texto == null) { return null; }
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, replaceSpace);
  }

  compararNormatizado(fonte: string, comparativo: string) {
    return this.normatizar(fonte).indexOf(comparativo) > -1;
  }

}
