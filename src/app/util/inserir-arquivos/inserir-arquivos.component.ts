import { Component, OnInit, HostBinding, Output, EventEmitter, ViewChild, ViewChildren, ElementRef, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-inserir-arquivos',
  templateUrl: './inserir-arquivos.component.html',
  styleUrls: ['./inserir-arquivos.component.css']
})
export class InserirArquivosComponent implements OnInit {
  // @Output() arquivosParaEnviar: any[] = [];
  @Output() arquivosParaEnviar = new EventEmitter<File[]>();
  @HostBinding('class') classes = 'br5 pa16 borda-cinza-tracejada ma16';
  @ViewChild('fileDropRef') input: ElementRef<HTMLInputElement> ;
  @Input() single= false;
  constructor(
    public http: HttpClient
  ) { }

  enviarArquivos(arquivosParaEnviar: FileList) {
    const items = [];
    for (let index = 0; index < arquivosParaEnviar.length; index++) {
      const item = arquivosParaEnviar.item(index);
      items.push(item);
    }
    this.arquivosParaEnviar.emit(items);
    this.input.nativeElement.value = null;
    console.log('arquivos enviados: ', items, arquivosParaEnviar);
    // console.log(this.arquivos, arquivosParaEnviar);
  }

  ngOnInit(): void {
  }
}
