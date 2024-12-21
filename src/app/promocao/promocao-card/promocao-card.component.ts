import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { Promocao } from 'src/app/model/API/Promocao';

@Component({
  selector: 'app-promocao-card',
  templateUrl: './promocao-card.component.html',
  styleUrls: ['./promocao-card.component.css']
})
export class PromocaoCardComponent implements OnInit {

  constructor() { }

  @Input() produto: number = null;
  @Input() promocao: Promocao = {} as Promocao;

  @Output() remover = new EventEmitter<number>();


  @HostBinding('class') classes = "bg-branco card ma8 pa16 br5";

  ngOnInit(): void {
  }

}
