import { SeoService } from 'src/app/service/seo.service';
import { Seo } from 'src/app/model/API/Seo';
import { Component, OnInit, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MenuService } from 'src/app/service/menu.service';



@Component({
  selector: 'app-seo-link-card',
  templateUrl: './seo-link-card.component.html',
  styleUrls: ['./seo-link-card.component.css'],
})

export class SeoLinkCardComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private fb: FormBuilder,
    private menuService: MenuService
  ) {
   }


  @HostBinding('class') classes = 'w-100 br5 borda-cinza bg-branco pa8';

  @Input() seo: Seo = {} as Seo;
  @Input() abrirNovoCard: boolean = false;
  @Input() items: [];
  @Output() fecharNovoCard: EventEmitter<boolean> = new EventEmitter<boolean>();

  editar = false;
  novo = false;
  novoClick(o:any): void{
    this.novo = true;
  }

  cancelarClick(): void{
    this.novo = false;
    this.editar = false;
  }

  cancelarSeoClick(): void{
    this.abrirNovoCard = false;
    this.fecharNovoCard.emit(this.abrirNovoCard);
  }

  salvarSeoClick(o:any): void{
    this.abrirNovoCard = false;
    this.menuService.loading = true;
    this.seoService.post(o).subscribe(response => {
      alert('SEO salvo com sucesso!')
      this.fecharNovoCard.emit(this.abrirNovoCard);
      this.menuService.loading = false;
    });
  }

  editarClick(): void{
    this.editar = true;
  }
  
  salvarClick(o:any): void{
    this.editar = false;
    this.menuService.loading = true;
    this.seoService.put(o).subscribe((res)=>{
      this.menuService.loading = false;
      alert('SEO atualizado com sucesso!');
    });
  }

  removerClick(o:any){
    if(confirm('Esta ação é irreversível, deseja continuar?')){
      this.menuService.loading = true;
      this.seoService.delete(o).subscribe(response => {
        console.log(response);
        this.menuService.loading = false;
        this.loadSeo();
      });
    }
  }

  loadSeo(){
    this.menuService.loading = true;
    this.seoService.getAll().subscribe((o:[]) => {
      this.items = o;
      this.menuService.loading = false;
    })
  }

  ngOnInit(): void {
    this.editar = this.abrirNovoCard;
  }

}
