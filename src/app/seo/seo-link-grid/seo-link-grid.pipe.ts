import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class SeoLinkGridPipe implements PipeTransform {
    transform(items: any[], searchText: string): any[] {
      if(!items) return [];
      if(!searchText) return items;
        searchText = searchText.toLowerCase();
        return items.filter( it => {
            if(it.link != undefined){
                return it.link.toLowerCase().includes(searchText);
            }
        });
     }
}