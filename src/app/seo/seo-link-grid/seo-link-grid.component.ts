import { SeoService } from 'src/app/service/seo.service';
import { Component, OnInit, HostBinding, Input, EventEmitter, Output  } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Seo } from 'src/app/model/API/Seo';
import { MenuService } from 'src/app/service/menu.service';

@Component({
  selector: 'app-seo-link-grid',
  templateUrl: './seo-link-grid.component.html',
  styleUrls: ['./seo-link-grid.component.css'],
})


export class SeoLinkGridComponent implements OnInit {

  constructor(
    private seoService: SeoService,
    private menuService: MenuService
  ) { 
  }

  //@Input() novoSeo: boolean;

  seo: Seo = {} as Seo; 
  items = []
  
  searchText: any;

  loadSeos(){
    this.menuService.loading = true;
    this.seoService.getAll().subscribe((r)=>{
      this.items = r;
      this.menuService.loading = false;
    });
  }

  search(query:any){
    var _items = this.items;
    var result = this.items.filter(x=>x.link == query)
    if(result.length == 0){
      this.items = _items;
    }
    this.items = result;
  }

  ngOnInit():void {
    this.loadSeos();
  }
}

