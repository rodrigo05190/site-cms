import { ProdutoPromocao } from './ProdutoPromocao';
import { Imagem } from './Imagem';

export interface Promocao {
    id: number;
    identificacao: string;
    textoLegal: string;
    url: string;
    produtoPromocao: ProdutoPromocao[];
    seloId: Imagem
}