import { Redirect } from './../../model/API/Redirect';
import { RedirectService } from './../../service/redirect.service';
import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-redirect-card',
  templateUrl: './redirect-card.component.html',
  styleUrls: ['./redirect-card.component.css']
})
export class RedirectCardComponent implements OnInit {

  constructor(
    private redirectService: RedirectService
  ) { }

  @HostBinding('class') classes = 'w-100';
  @Output() atualizar = new EventEmitter<Redirect>();

  _novo = false;
  get novo() {
    return this._novo;
  }
  @Input() set novo(value) {
    this._novo = value;
    this.novoChange.emit(this._novo);
  }
  @Output() novoChange = new EventEmitter<boolean>();
  @Input() redirect: Redirect = {} as Redirect;

  ngOnInit(): void {
  }

  salvar() {
    if (this.redirect.id) {
      this.redirectService.put(this.redirect).subscribe(sucesso => {
        this.redirect = sucesso;
      });
    }
    else {
      this.redirectService.post(this.redirect).subscribe(sucesso => {
        this.redirect = sucesso;
        this.atualizar.emit(this.redirect);
      });
    }
  }

  excluir() {
    this.novo = false;
    if (this.redirect?.id) {
      this.redirectService.delete(this.redirect).subscribe(sucesso => {
        // this.redirect = {} as Redirect;
        this.atualizar.emit(null);
      });
    }
  }

}
