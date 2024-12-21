import { EdicaoImagem } from './../../model/EdicaoImagem';
import { fadeIn } from 'ng-animate';
import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { ImageTransform, ImageCroppedEvent, base64ToFile, Dimensions } from 'ngx-image-cropper';
import { Observable, fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { trigger, useAnimation, transition } from '@angular/animations';

@Component({
  selector: 'app-imagem-editor',
  templateUrl: './imagem-editor.component.html',
  styleUrls: ['./imagem-editor.component.css'],
})

export class ImagemEditorComponent implements OnInit {
  _arquivos: File[] = [];
  @Output() arquivosChange = new EventEmitter<File[]>();
  canvasRotation = 0;
  containWithinAspectRatio = false;
  croppedImage: any = '';
  imageChangedEvent: any = '';
  public imagens: EdicaoImagem[] = [];
  indexAtual = 0;
  previewModoThumb = false;
  @Output() resultado = new EventEmitter<File[]>();
  rotation = 0;
  scale = 1;
  showCropper = false;
  transform: ImageTransform = {};

  constructor() { }

  @Input() get arquivos() {
    return this._arquivos;
  }

  set arquivos(valor) {
    this._arquivos = valor;
    this.arquivosChange.emit(this._arquivos);
  }

  blobToFile(theBlob, fileName) {
    // A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  continuar() {
    // this.imagens.splice(0, 1);
    if ((this.indexAtual + 1) >= this.arquivos.length) {
      this.finalizar();
      // this.arquivos = [];
      this.fechar();
    }
    else {
      this.indexAtual++;
    }
  }

  fechar() {
    this.arquivos = [];
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  finalizar() {
    const arquivosFinais = this.imagens.map(imagem => {
      if (!(imagem?.resultadoBase64)) { return null; }
      const blob = base64ToFile(imagem.resultadoBase64);
      const file = this.blobToFile(blob, imagem.originalFile.name);
      return file;
    }).filter(x => x);

    this.resultado.emit(arquivosFinais);
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  imageCropped(event: ImageCroppedEvent, edicaoImagem: EdicaoImagem) {
    this.croppedImage = event.base64;
    edicaoImagem.resultadoBase64 = this.croppedImage;

    // console.log(event, file);
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  imageToBase64(fileReader: FileReader, fileToRead: File): Observable<string> {
    fileReader.readAsDataURL(fileToRead);
    return fromEvent(fileReader, 'load').pipe(pluck('currentTarget', 'result'));
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  ngOnInit(): void {
    console.log(this.arquivos);
    this.arquivos.forEach(arquivo => {
      this.imageToBase64(new FileReader(), arquivo).subscribe(base64 => {
        const resultado: EdicaoImagem = {
          originalFile: arquivo,
          resultadoBase64: null,
          originalBase64: base64,
          tipo: arquivo.type.replace('image/', '')
        };

        this.imagens.push(resultado);
      });
    });
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }
}
