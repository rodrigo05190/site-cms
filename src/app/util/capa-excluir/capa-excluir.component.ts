import { Component, OnInit, Input, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-capa-excluir',
  templateUrl: './capa-excluir.component.html',
  styleUrls: ['./capa-excluir.component.css']
})
export class CapaExcluirComponent implements OnInit {

  constructor(
    public ef: ElementRef,
  ) { }


  // @HostBinding() private classes = "";
  @Input() icone = 'delete';
  @Input() texto = 'excluir';

  @Input() desvincular;
  @Input() excluir;

  @HostListener('mouseover') hover() {
    this.ef.nativeElement.classList.add('mostrar');
  }

  @HostListener('mouseout') hoversaiu() {
    this.ef.nativeElement.classList.remove('mostrar');
  }

  ngOnInit(): void {
    if (this.desvincular !== undefined) {
      this.icone = 'link_off';
      this.texto = 'desvincular';
    }
    if (this.excluir !== undefined) {
      this.icone = 'delete';
      this.texto = 'excluir';
    }
    // console.log(this.desvincular);
  }

}
