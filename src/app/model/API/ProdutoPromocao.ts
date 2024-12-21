import { Produto } from './Produto';
import { Promocao } from './Promocao';

export interface ProdutoPromocao {
    produtoId: number;
    promocaoId: number;
    produto: Produto;
    promocao: Promocao;
}