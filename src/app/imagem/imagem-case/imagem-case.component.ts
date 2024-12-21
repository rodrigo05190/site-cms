import { ImagemService } from './../../service/imagem.service';
import { Imagem } from './../../model/API/Imagem';
import { Component, OnInit, Input, HostBinding, Output, EventEmitter, HostListener, forwardRef, Self, Optional, AfterContentInit } from '@angular/core';
import { HttpEventType, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-imagem-case',
  templateUrl: './imagem-case.component.html',
  styleUrls: ['./imagem-case.component.css'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => ImagemCaseComponent),
  //     multi: true
  //   }
  // ]
})

export class ImagemCaseComponent implements OnInit, ControlValueAccessor {
  public _imagem: Imagem;
  arquivosUploadParaEditar: File[] = [];
  public checked = false;
  @HostBinding('class') public classes = 'br5 card ma8';
  @Input() public descricao;
  @Input() public drag;
  @Input() public enviar;
  public erroEnvio = false;
  @Input() public fileUpload: File;
  @HostBinding('id') @Input() public id;
  @Output() public imagemChange = new EventEmitter<any>();
  inputId = Math.random().toString(36).slice(2);
  @Input() public multi: number[] = null;
  @Output() public multiChange = new EventEmitter<number[]>();
  @Input() public produtoId: number;
  @Input() public progresso;
  @Input() public remover;
  @Output() public clickDeletar = new EventEmitter<number>();
  @Input() public src;
  @Input() public titulo = '';
  @Output() public uploadFinalizado = new EventEmitter<Imagem>();
  @Input() public visualizar;
  abrirDescricao = false;

  environment = environment;

  @HostListener('click', ['$event']) blur(event) {
    // alert();
    this.onTouched(event);
  }

  constructor(
    public http: HttpClient,
    private imagemService: ImagemService,
    @Self() @Optional() public control: NgControl
  ) {
    // console.log(control);
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }




  onChange = (_: any) => { };

  onTouched = (_: any) => { };


  get value() {
    return this.id;
  }

  @Input() set value(v) {
    if (typeof v === 'number') {
      this.id = v;
    } else {
      this.id = null;
    }
    this.onChange(v);
  }

  excluir() {
    if (this.imagem?.id) {
      this.clickDeletar.emit(this.imagem.id);
    }
    this.imagem = null;
    this.value = null;
  }

  writeValue(value: number) {
    console.log(value);
    if (value != null) {
      if (typeof value === 'number') {
        this.id = value;
        this.carregarImagemPorId(this.id);
      }
    } else {
      this.excluir();
    }
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
  }








  @HostBinding('attr.checked') public get a() {
    return this.checked || null;
  }

  @Input() public get imagem() {
    return this._imagem;
  }

  public set imagem(valor) {
    this._imagem = valor;
    this.imagemChange.emit(this._imagem);
  }

  public get selecionado() {
    return this.multi?.some(x => x === this.id) || false;
  }

  public set selecionado(valor) {
    if (valor) {
      this.multi.push(this.id);
    } else {
      this.multi = this.multi.filter(x => x !== this.id);
    }
    this.multiChange.emit(this.multi);
  }

  abc(x) {
    console.log(x);
  }

  put() {
    this.imagemService.put(this.imagem).subscribe(sucesso => {
      this.imagem = sucesso;
    });
  }

  public enviarArquivo(arquivoParaEnviar: File) {
    console.log(this.produtoId);
    this.erroEnvio = false;
    this.imagem = null;
    const item = arquivoParaEnviar;
    const formData = new FormData();
    formData.append('arquivos', item, item.name);
    formData.append('produtoId', this.produtoId.toString());

    this.http.post(environment.API_ROOT + 'arquivo/imagem', formData, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          // this.arquivos.filter()
          const x = Math.round(100 * event.loaded / event.total);
          this.progresso = x;
          console.log(x);
        }
        else if (event.type === HttpEventType.Response) {
          const imagem = event.body as any;
          this.uploadFinalizado.emit(imagem);
          this.imagem = imagem;
          this.value = imagem.id;
          this.progresso = null;
        }
        console.log(event);
      }, (erro: HttpErrorResponse) => {
        this.erroEnvio = true;
      });

    // console.log(this.arquivos, arquivosParaEnviar);
  }

  public finalizarUpload() {
    this.fileUpload = undefined;
    this.progresso = undefined;
  }

  getFileArray(arquivosParaEnviar: FileList) {
    const items = [];
    for (let index = 0; index < arquivosParaEnviar.length; index++) {
      const item = arquivosParaEnviar.item(index);
      items.push(item);
    }
    return items;
    // this.arquivosParaEnviar.emit(items);
    // this.input.nativeElement.value = null;
    // // console.log(this.arquivos, arquivosParaEnviar);
  }

  public ngOnInit(): void {
    // console.log('produtoId: ', this.produtoId);
    if (this.fileUpload) {
      this.enviarArquivo(this.fileUpload);
    } else if (this.id) {
      this.carregarImagemPorId(this.id);
    }
  }

  carregarImagemPorId(imagemId) {
    this.imagemService.get(imagemId).subscribe(sucesso => {
      this.imagem = sucesso;
    });
  }
}
