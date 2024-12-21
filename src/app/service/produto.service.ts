import { ProdutoVideo } from './../model/API/ProdutoVideo';
import { CidadeService } from './cidade.service';
import { BairroService } from './bairro.service';
import { EnderecoService } from './endereco.service';
import { UtilService } from 'src/app/service/util.service';
import { StatusObra } from './../model/API/StatusObra';
import { StatusConjunto } from './../model/API/StatusConjunto';
import { ProdutoCard } from './../model/API/ProdutoCard';
import { filter, tap, switchMap, map, shareReplay, catchError } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { HttpClient } from '@angular/common/http';
import { Produto } from './../model/API/Produto';
import { Injectable, Pipe } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { interval, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repository } from '../model/Repository';
import { Conjunto } from '../model/API/Conjunto';
import { DiferencialProduto } from '../model/API/DiferencialProduto';
import { ProdutoPromocao } from '../model/API/ProdutoPromocao';
import { Ordem } from '../model/Ordem';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService extends Repository<Produto> {


  constructor(
    private http: HttpClient,
    private utilService: UtilService,
    private enderecoService: EnderecoService,
    private bairroService: BairroService,
    private cidadeService: CidadeService
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_PRODUTO);
  }

  Ordenar(ordenados: Ordem[]) {
    return this.http.post<void>(environment.API_ROOT + environment.API_PATH_PRODUTO + 'card', ordenados);
  }

  getLink(produtoId: number): Observable<string | null> {
    return this.http.get(environment.API_ROOT + environment.API_PATH_PRODUTO + '?$filter=id eq +' + produtoId + '&$expand=endereco($expand=bairro($expand=cidade))')
      .pipe(catchError(x => of(null)), map(sucesso => {
        const produto = sucesso[0];
        const bairro = produto?.endereco?.bairro?.nome;
        const cidade = produto?.endereco?.bairro?.cidade?.nome;
        if (!bairro || !cidade || !produto.chave) { return null; }
        const bairroNormatizado = this.utilService.normatizar(bairro, '-');
        const cidadeNormatizado = this.utilService.normatizar(cidade, '-');
        return '/' + cidadeNormatizado + '/' + bairroNormatizado + '/' + produto.chave;
      }));

  }

  getCard() {
    return this.http.get<ProdutoCard[]>(environment.API_ROOT + environment.API_PATH_PRODUTO + 'card');
  }
  getCardUnico(produtoId: number) {
    return this.http.get<ProdutoCard>(environment.API_ROOT + environment.API_PATH_PRODUTO + 'card/' + produtoId);
  }

  getConjuntos(produtoId: number) {
    return this.http.get<Conjunto[]>(environment.API_ROOT + environment.API_PATH_PRODUTO + produtoId + '/conjunto');
  }

  getDiferencial(produtoId: any) {
    return this.http.get<DiferencialProduto[]>(environment.API_ROOT + environment.API_PATH_PRODUTO + produtoId + '/diferencial')
  }

  getStatusObra(produtoId: any) {
    return this.http.get<StatusObra>(environment.API_ROOT + environment.API_PATH_PRODUTO + produtoId + '/statusobra')
  }
  // getConjuntos(produtoId: number) {
  //   return this.http.get<Conjunto[]>(environment.API_ROOT + environment.API_PATH_PRODUTO + produtoId + '/conjunto');
  // }

  getPromocoes(produtoId: any) {
    return this.http.get<ProdutoPromocao[]>(environment.API_ROOT + environment.API_PATH_PRODUTO + produtoId + '/promocao')
  }

  getVideos(produtoId: any) {
    return this.http.get<ProdutoVideo[]>(environment.API_ROOT + environment.API_PATH_PRODUTO + produtoId + '/video')
  }


}
