import { SeoKeyword } from './SeoKeyword';
import { SeoLink } from './SeoLink';
import { SeoProduto } from './SeoProduto';

export interface Seo {
    id: number;
    title: string;
    description: string;
    h1: string;
    h2: string;
    link: string;
    seoKeyword: SeoKeyword[];
    seoLink: SeoLink[];
    seoProduto: SeoProduto[];
}