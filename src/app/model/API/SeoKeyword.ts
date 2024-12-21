import { Keyword } from './Keyword';
import { Seo } from './Seo';

export interface SeoKeyword {
    keywordId: number;
    seoId: number;
    keyword: Keyword;
    seo: Seo;
}