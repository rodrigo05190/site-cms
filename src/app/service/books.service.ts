import { Injectable } from '@angular/core';
import { Repository } from '../model/Repository';
import { Books } from '../model/API/Books';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, filter, switchMap } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class BooksService extends Repository<Books> {

  constructor(
    private http: HttpClient
  ) {
    super(http, environment.API_ROOT + environment.API_PATH_BOOKS);
  }

  post(book: Books) {
    const formData = new FormData();

    if (book.arquivos) {
      const item = book.arquivos[0];
      formData.append('arquivos', item, item.name);
    }

    formData.append('produtoId', book.produtoId.toString());
    formData.append('descricao', book.descricao);
    formData.append('link', book.link);

    return this.http.post<Books>(environment.API_ROOT + environment.API_PATH_BOOKS, formData)

      // .pipe(filter(event =>  event.type == HttpEventType.Response),
      // map(evento => JSON.parse((evento as any).body as string) as Books));

  }
}

