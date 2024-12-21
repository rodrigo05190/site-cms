import { environment } from './../../../environments/environment';
import { ImagemService } from './../../service/imagem.service';
import { Component, OnInit, HostBinding, Input, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Imagem } from 'src/app/model/API/Imagem';

@Component({
  selector: 'app-icone-seletor',
  templateUrl: './icone-seletor.component.html',
  styleUrls: ['./icone-seletor.component.css']
})
export class IconeSeletorComponent implements OnInit, ControlValueAccessor {
  aberto = false;
  @HostBinding('class') classes = '';
  id?: number;
  imagemSelecionada: Imagem;
  imagens: Imagem[] = [];
  @Input() imagensIds: number[];
  environment = environment;

  onChange = (_: any) => { };

  onTouched = (_: any) => { };

  constructor(
    @Self() @Optional() public control: NgControl,
    private imagemService: ImagemService
  ) {
    // console.log(control);
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  get value() {
    return this.id;
  }

  @Input() set value(v) {
    console.log(v);
    if (typeof v === 'number') {
      this.id = v;
    } else {
      this.id = null;
    }
    this.onChange(v);
  }

  excluir() {
    this.value = null;
  }

  ngOnInit(): void {
    this.imagensIds.forEach(id => {
      this.imagemService.get(id).subscribe(imagem => this.imagens.push(imagem));
    });
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

  writeValue(value: number) {
    console.log(value);
    if (value != null) {
      if (typeof value === 'number') {
        this.id = value;
      }
    } else {
      this.excluir();
    }
  }
}
