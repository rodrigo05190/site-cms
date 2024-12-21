import { map } from 'rxjs/operators';
import { ProdutoCrm } from './../../model/API/ProdutoCrm';
import { CrmService } from './../../service/crm.service';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ProdutoCrmService } from 'src/app/service/produto-crm.service';

@Component({
  selector: 'app-crm-grid',
  templateUrl: './crm-grid.component.html',
  styleUrls: ['./crm-grid.component.css']
})
export class CrmGridComponent implements OnInit, AfterViewInit {

  @Input() produtoId: number;
  form = this.fb.group({
    produtoId: [null, [Validators.required]],
    crmId: [null, [Validators.required]],
    codigo: [null, [Validators.required]],
  });

  constructor(
    public crmService: CrmService,
    private fb: FormBuilder,
    private produtoCrmService: ProdutoCrmService
  ) { }

  vinculos: ProdutoCrm[] = [];

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.atualizar();
    this.produtoCrmService.mudanca$.subscribe(x => this.atualizar());
  }

  alterar(item) {
    this.vinculos.filter(x => x != item).forEach(x => {
      this.produtoCrmService.put({ ...x, principal: false }).subscribe();
    });

    this.produtoCrmService.put(item).subscribe();
  }

  atualizar() {
    this.produtoCrmService.getByProduto(this.produtoId).subscribe(x => this.vinculos = x);
  }

  novo(produtoId, crmid, codigo) {
    this.produtoCrmService.post({ produtoId, crmid, codigo, principal: this.vinculos.length ? !this.vinculos.some(x => x.principal) : true }).subscribe();
  }

  listaCrms() {
    return this.crmService.getAll().pipe(map(lista => lista.filter(x => !this.vinculos.some(v => v.crmid == x.id))))
  }

  vinculosLista() {
    return this.vinculos;
  }

  remover(x: ProdutoCrm) {
    this.produtoCrmService.delete(x).subscribe();
  }
}
