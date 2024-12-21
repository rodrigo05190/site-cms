import { VideoInfo } from './../model/VideoInfo';
import { filter, tap, switchMap, map, shareReplay } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { interval, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Repository } from '../model/Repository';
import { ProdutoVideo } from '../model/API/ProdutoVideo';

@Injectable({
  providedIn: 'root'
})
export class ProdutoVideoService extends Repository<ProdutoVideo> {
  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_PRODUTOVIDEO);
  }

  getByProduto(produtoId) {
    return this.http.get<ProdutoVideo[]>(environment.API_ROOT + environment.API_PATH_PRODUTOVIDEO + produtoId);
  }

  getInfo(watchIdYoutube) {
    return this.http
      .get<any>('https://api.allorigins.win/get?url=https://noembed.com/embed?url=https://www.youtube.com/watch?v=' + watchIdYoutube)
      .pipe(map(x => {
        const contents = JSON.parse(x.contents) as any;

        if (contents.error) {
          throw new Error('404');
        }

        return contents as VideoInfo;
      }));
  }
}
