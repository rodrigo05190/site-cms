import { ProdutoService } from './../service/produto.service';
import { DashboardService } from './../service/dashboard.service';
import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { Produto } from '../model/API/Produto';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(
    private dashboardService: DashboardService,
    public produtoService: ProdutoService
  ) { }

  todosProdutos: Produto[] = [];

  @HostBinding('class') classes = 'pagina';

  todosProdutos$ = this.produtoService.getAll()
    .subscribe(
      sucesso => {
        this.todosProdutos = sucesso;
      }
    );

  ngOnInit(): void {
    // this.dashboardService.get().subscribe(sucesso => {
    //   // sucesso;

    // });

  }

  ngOnDestroy(): void {
    this.todosProdutos$.unsubscribe();
  }


}
