import { Imagem } from './../../model/API/Imagem';
import { AreaComumIconeService } from './../../service/areaComumIcone.service';
import { AreaComumTipo } from './../../model/API/AreaComumTipo';
import { AreaComumTipoService } from './../../service/areaComumTipo.service';
import { AreaComumService } from './../../service/areaComum.service';
import { AreaComum } from './../../model/API/AreaComum';
import { ControlValueAccessor, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { AreaComumIcone } from 'src/app/model/API/AreaComumIcone';

@Component({
  selector: 'app-areacomum-ficha',
  templateUrl: './areacomum-ficha.component.html',
  styleUrls: ['./areacomum-ficha.component.css']
})
export class AreacomumFichaComponent implements OnInit {

  // items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  @Input() produtoId: number;
  items: AreaComum[] = [];
  icones: number[] = [];
  novaAreaComum: AreaComum = {} as AreaComum;
  form = this.fb.group({
    produtoId: [null, [Validators.required]],
    tipoId: [null, [Validators.required]],
    quantidade: [null, [Validators.required]],
    descricao: [null, [Validators.required]],
    iconeId: [null, [Validators.required]],
  });

  nv = [];

  tipos: AreaComumTipo[] = [];

  constructor(
    private fb: FormBuilder,
    private areaComumService: AreaComumService,
    private areaComumTipoService: AreaComumTipoService,
    private areaComumIconeService: AreaComumIconeService
  ) { }

  ngOnInit(): void {
    this.areaComumTipoService.getAll().subscribe(sucesso => {
      this.tipos = sucesso;
    });

    this.areaComumService.getByProduto(this.produtoId).subscribe(sucesso => {
      this.items = sucesso.sort((a, b) => a.ordem - b.ordem);
    });

    this.areaComumIconeService.getAll().subscribe(sucesso => {
      this.icones = sucesso.map(x => x.imagemId);
    });

  }

  novo() {
    // this.nv.push(this.form.value);
    this.areaComumService.post(this.form.value).subscribe(sucesso => {
      this.items.push(sucesso);
    });
  }

  sorted(evento: { previusOrder: [], currentOrder: [] }) {
    this.items = evento.currentOrder;
    this.items.forEach((item, index) => {
      item.ordem = index;
      this.areaComumService.put(item).subscribe();
    });
  }

  deletou(id: number) {
    this.items = this.items.filter(x => x.id != id);
  }
}
