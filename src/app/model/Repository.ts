import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, tap, take, share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Produto } from './API/Produto';
export class Repository<T> {

  constructor(
    private httpClient: HttpClient,
    private link: string
  ) {

  }

  dataStorage$ = this.httpClient.get<T[]>(this.link).pipe(take(1), shareReplay(1));
  dataStorageUnique$: Observable<T>[] = [];
  mudanca$ = new EventEmitter<'delete'|'put'|'post'>();

  public getAll(): Observable<T[]> {
    return this.dataStorage$;
  }

  public get(id: number): Observable<T> {
    if (!this.dataStorageUnique$[id]) {
      this.dataStorageUnique$[id] = this.httpClient.get<T>(this.link + id).pipe(take(1), shareReplay(1));
    }
    return this.dataStorageUnique$[id];
  }

  public post(item: T): Observable<T> {
    return this.httpClient.post<T>(this.link, item).pipe(tap(sucesso => { this.resetAll(); this.mudanca$.emit('post'); }));
  }

  public delete(item: T): Observable<any> {
    // return this.httpClient.delete(this.link + id).pipe(tap(sucesso => { this.resetAll(); }));
    return this.httpClient.request('delete', this.link, { body: item }).pipe(tap(sucesso => { this.resetAll(); this.mudanca$.emit('delete'); }));
  }

  public put(item: T) {
    return this.httpClient.put<T>(this.link, item).pipe(tap(sucesso => { this.resetAll(); this.mudanca$.emit('put'); }));
  }

  public resetAll() {
    this.dataStorage$ = this.httpClient.get<T[]>(this.link).pipe(shareReplay(1));
    this.dataStorageUnique$ = [];
  }

}
