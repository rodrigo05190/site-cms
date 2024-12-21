import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { isIP } from 'net';
import { PromocaoService } from 'src/app/service/promocao.service';
import { Promocao } from 'src/app/model/API/Promocao';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-promocao-ficha',
  templateUrl: './promocao-ficha.component.html',
  styleUrls: ['./promocao-ficha.component.css']
})
export class PromocaoFichaComponent implements OnInit {

  constructor(
    private promocaoService: PromocaoService,
    private location: Location,
    private router: ActivatedRoute
  ) { }

  editar = false;
  promocao: Promocao = {} as Promocao;
  @HostBinding('class') classes = 'pagina';
  @Input() produtoId: number;
  get():void{
    const params = this.router.snapshot.params;
    const id = params.promocaoId;
    console.log(params,id);
    this.promocaoService.get(id).subscribe((o:Promocao)=>{
      console.log(o);
      this.promocao = o;
    })
  }

  ngOnInit(): void {
    if (this.router.snapshot.params.promocaoId) {

    }
    this.get();
  }



  novaPromocao(){
    this.promocaoService.post(this.promocao).subscribe(sucesso => {
      this.location.back();
    })
  }

  excluirPromocao(){
    this.promocaoService.delete(this.promocao).subscribe(sucesso => {
      this.location.back();
    })
  }

  editarPromocao(){
    this.promocaoService.put(this.promocao).subscribe(sucesso => {
      this.location.back();
    })
  }
}
