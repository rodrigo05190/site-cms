import { Produto } from './Produto';
import { Seo } from './Seo';

export interface SeoProduto {
    seoId: number;
    produtoId: number;
    produto: Produto;
    seo: Seo;
}